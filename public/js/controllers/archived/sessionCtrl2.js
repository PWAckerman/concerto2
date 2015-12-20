'use strict';
angular.module('concerto').controller('sessionCtrl', ['$scope', function($scope){

var localVideo;
var remoteVideo;
var peerConnection;
var localStream;
var serverConnection;
var peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
  // $scope.offer = getOfferFromFriend()
  // $scope.hideOrigin = true;
  $scope.gotMessageFromServer = function(message) {
    console.log('Heard the server!');
      if(!peerConnection) $scope.start(false);
      console.log('THIS FAR')
      var signal = JSON.parse(message.data);
      console.log(signal)
      if(signal.sdp) {
        console.log('we got SDP!')
          peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), function() {
              peerConnection.createAnswer($scope.gotDescription, errorHandler);
          }, errorHandler);
      } else if(signal.ice) {
        console.log('this ICE is cold')
          peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
      }
  }

  $scope.pageReady = function () {
      localVideo = document.getElementById('video');
      console.log(localVideo)
      remoteVideo = document.getElementById('returnVideo');
      console.log(remoteVideo);
      serverConnection = new WebSocket('wss://62eaa7dd.ngrok.io');
      serverConnection.onmessage = $scope.gotMessageFromServer;
      var constraints = {
          video: true,
          audio: true,
      };

      if(navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(constraints)
          .then(
            function(stream){
              $scope.getUserMediaSuccess(stream)
            }).catch(errorHandler);
      } else {
          alert('Your browser does not support getUserMedia API');
      }
  }


  $scope.getUserMediaSuccess = function(stream) {
    console.log('Don\t cross the streams!')
      localStream = stream;
      localVideo.src = window.URL.createObjectURL(stream);
  }

  $scope.start = function(isCaller) {
    console.log('Is caller?', isCaller);
    console.log('Starting the call...')
      peerConnection = new RTCPeerConnection(peerConnectionConfig);
      peerConnection.onicecandidate = $scope.gotIceCandidate;
      peerConnection.onaddstream = $scope.gotRemoteStream;
      console.log(peerConnection);
      console.log(localStream);
      peerConnection.addStream(localStream);

      if(isCaller) {
        console.log('Offering up...')
          peerConnection.createOffer($scope.gotDescription, errorHandler);
      }
  }

  $scope.gotIceCandidate = function(event) {
    console.log('cold ICE candidate');
      if(event.candidate != null) {
        console.log('does not equal null!')
          serverConnection.send(JSON.stringify({'ice': event.candidate}));
      }
  }

  $scope.gotDescription = function(description) {
      console.log('got description');
      peerConnection.setLocalDescription(description, function () {
          serverConnection.send(JSON.stringify({'sdp': description}));
      }, function() {console.log('set description error')});
  }

  $scope.gotRemoteStream = function(event) {
      console.log('where is the remote stream!');
      remoteVideo.src = window.URL.createObjectURL(event.stream);
  }

  function errorHandler(error) {
      console.log(error);
  }

  $scope.pageReady();
}])
