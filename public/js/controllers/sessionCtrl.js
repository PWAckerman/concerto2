angular.module('concerto').controller('sessionCtrl', ['$scope', 'sessionService', '$stateParams', 'chatSocket', '$http', '$state','$sce', function($scope, sessionService, $stateParams, chatSocket, $http, $state, $sce){
  chatSocket.forward('chatconnected', $scope)
  chatSocket.forward('roomjoined', $scope)
  chatSocket.forward('messagefeed', $scope)
  chatSocket.forward('streamFeed', $scope)
  // chatSocket.on('roomjoined', function(ev, data){
  //   console.log('Why is this working, but the other way isnt')
  // })
  var constraints = {audio: true, video: true}
  var localStream;
  var localVideo;
  var errorHandler = function(err){
    console.log(err);
  }
  var viewVideo = function(video, context){
    context.drawImage(video,0,0,context.width,context.height)
    chatSocket.emit('stream', canvas.toDataURL('image/webp'))
  }
  var canvas = document.getElementById("preview");
  var destination = document.getElementById("returnVideo")
  var context = canvas.getContext("2d");
  context.width = canvas.width;
  context.height = canvas.height;
  $scope.seeAssignment = function(){
    $state.go('auth.assignment', {id: $stateParams.id})
  }
  $scope.checkUser = function(){
    if($scope.thisSession.joined.map(function(user){
          return user._id
        }).indexOf($scope.navInfo._id) > -1){
          $scope.userHasJoined = true
    } else {
      $scope.userHasJoined = false;
    }

  }
  $scope.localVideo = {};
  $scope.$on('socket:chatconnected', function(ev, data){
    console.log('we connected y\'all')
  })
  $scope.$on('socket:streamFeed', function(ev, image){
    destination.src = image;
  })
  $scope.sessionMessages = [];
  $scope.$on('socket:roomjoined', function(ev, data){
    console.log('Houston, we have a room.')
  })
  $scope.$on('socket:messagefeed', function(ev, data){
    console.log(data);
    $scope.sessionMessages.push(data.message)
  })
  $scope.thisSession = null;
  $scope.submitMessage = function(){
    if($scope.thisSession.isActive && $scope.userHasJoined || $scope.thisSession.isActive && $scope.user.usertype === 'Instructor'){
      $scope.newMessage.chatSession = $scope.sessionChat._id;
      $scope.newMessage.user = $scope.user._id;
      $scope.newMessage.name = $scope.user.name;
      $scope.newMessage.img = $scope.user.profilePicture;
      console.log($scope.newMessage)
      chatSocket.emit('newMessage', {message: $scope.newMessage})
      $scope.newMessage = {};
    } else {
      console.log('Think again, cowboy.')
    }
  }
  $scope.newMessage = {};
  $scope.initializeSession = function(){
    sessionService.getSession($stateParams.id).then(
      function(response){
        console.log(response);
        $scope.thisSession = response.data;
        $scope.checkUser()
        if($scope.thisSession.isActive && $scope.user.usertype === 'Instructor'){
          $scope.getVideoFeed();
          $scope.button = 'END'
        } else if(!$scope.thisSession.isActive && $scope.user.usertype === 'Instructor') {
          if(localVideo){
            localVideo.pause();
            localVideo.stop();
            localVideo.src = "";
            localStream.stop();
          } else if(!localVideo){
            $scope.getVideoFeed();
          }
          $scope.button = 'START'
        }
        $scope.getSessionChat();
      }
    )
  }
  $scope.getSession = function(){
    sessionService.getSession($stateParams.id).then(
      function(response){
        console.log(response);
        $scope.thisSession = response.data;
        $scope.checkUser()
        if($scope.thisSession.isActive){
          $scope.button = 'END'
        } else {
          $scope.button = 'START'
        }
        // $scope.getSessionChat();
      }
    )
  }
  $scope.getSessionChat = function(){
    sessionService.getSessionChat($scope.thisSession._id)
    .then(
      function(response){
        $scope.sessionChat = response.data
        chatSocket.emit('SessionRoom', { room: $scope.sessionChat._id })
        sessionService.getSessionMessageBySessionChat(response.data._id)
        .then(
          function(response){
            console.log(response)
            response.data.map(function(message){
              $scope.sessionMessages.push(message)
            })
          }
        )
      }
    )
  }
  $scope.initializeSession();
  $scope.toggleActive = function(){
    sessionService.toggleActive($scope.thisSession._id, !$scope.thisSession.isActive).then(
      function(response){
        $scope.getSession();
      }
    )
  }
  $scope.testSocket = function(){
    $http({
      method: 'POST',
      url: "/sessionchats/initialize/" + $scope.thisSession._id
    })
  }
  $scope.leaveSession = function(){
    sessionService.leaveSession($scope.navInfo._id, $scope.thisSession._id).then(
      function(response){
        $scope.getSession()
        $scope.checkUser();
      })
    }

  $scope.joinSession = function(){
    console.log('Joining Session')
    if($scope.thisSession.isActive){
      sessionService.joinSession($scope.navInfo._id, $scope.thisSession._id).then(
        function(response){
          $scope.getSession();
        })
    }
  }
  $scope.getVideoFeed = function(){
    console.log('trying to get video feed');
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
    var localVideo = document.getElementById("videosource")
    console.log(localVideo)
      localStream = stream;
      localVideo.src = window.URL.createObjectURL(stream);
      setInterval(function(){
        viewVideo(localVideo, context)
      }, 70)
  }
}])
