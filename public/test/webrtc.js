var localVideo;
var remoteVideo;
var peerConnection;
var peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};

// navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
// window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
// window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

$scope.pageReady = function () {
    localVideo = document.getElementById('video');
    remoteVideo = document.getElementById('returnVideo');

    serverConnection = new WebSocket('ws://127.0.0.1:3434');
    serverConnection.onmessage = gotMessageFromServer;

    var constraints = {
        video: true,
        audio: true,
    };

    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints, getUserMediaSuccess, errorHandler);
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
  console.log('Starting the call...')
    peerConnection = new RTCPeerConnection(peerConnectionConfig);
    peerConnection.onicecandidate = gotIceCandidate;
    peerConnection.onaddstream = gotRemoteStream;
    peerConnection.addStream(localStream);

    if(isCaller) {
      console.log('Offering up...')
        peerConnection.createOffer(gotDescription, errorHandler);
    }
}

$scope.gotMessageFromServer = function(message) {
  console.log('Heard the server!');
    if(!peerConnection) start(false);

    var signal = JSON.parse(message.data);
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

$scope.gotIceCandidate = function(event) {
  console.log('cold ICE candidate');
    if(event.candidate != null) {
        serverConnection.send(JSON.stringify({'ice': event.candidate}));
    }
}

$scope.gotDescription = function(description) {
    console.log('got description');
    peerConnection.setLocalDescription(description, function () {
        console.log(description)
        serverConnection.send(JSON.stringify({'sdp': description}));
    }, function() {console.log('set description error')});
}

$scope.gotRemoteStream = function(event) {
    console.log('got remote stream');
    remoteVideo.src = window.URL.createObjectURL(event.stream);
}

function errorHandler(error) {
    console.log(error);
}
