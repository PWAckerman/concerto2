'use strict';
angular.module('concerto').controller('sessionCtrl', ['$scope', function($scope){
  $scope.connection = new RTCPeerConnection();
  // $scope.offer = getOfferFromFriend()
  $scope.hideOrigin = true;
  $scope.connection.onaddstream = function(obj){
    var vid = document.querySelector('#returnVideo')
    vid.srcObject = obj.stream;
    console.log(obj)
  }
  $scope.endCall = function(){
    var videos = document.getElementsByTagName("video")
    videos.map(function(video){
      video.pause()
    })
    $scope.connection.close()
  }
  $scope.error = function(err){
    endCall();
  }
  $scope.getMedia = function(){
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
      .then(function(mediaStream){
        $scope.media = mediaStream
        $scope.video = document.querySelector('#video');
        $scope.video.src = window.URL.createObjectURL($scope.media)
        $scope.video.onloadedmetadata = function(e){
          $scope.video.play()
        }
        $scope.connection.onaddstream({stream: $scope.media});
        $scope.connection.addStream($scope.media)
        $scope.connection.createOffer(function(offer){
          console.log(offer.toJSON());
          $scope.connection.setLocalDescription(new RTCSessionDescription(offer), function(){
            //rtcService.sendOffer(offer)
          }, $scope.error)
        }, $scope.error)
      })
      .catch(function(err){
        console.log(err);
      }
    )}
  $scope.getMedia();

}])
