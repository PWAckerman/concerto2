angular.module('concerto').controller('sessionCtrl', ['$scope', 'sessionService', '$stateParams', 'chatSocket', '$http', function($scope, sessionService, $stateParams, chatSocket, $http){
  chatSocket.forward('chatconnected', $scope)
  chatSocket.forward('roomjoined', $scope)
  chatSocket.forward('messagefeed', $scope)
  // chatSocket.on('roomjoined', function(ev, data){
  //   console.log('Why is this working, but the other way isnt')
  // })
  $scope.checkUser = function(){
    if($scope.thisSession.joined.map(function(user){
          return user._id
        }).indexOf($scope.navInfo._id) > -1){
          $scope.userHasJoined = true
    } else {
      $scope.userHasJoined = false;
    }

  }
  $scope.$on('socket:chatconnected', function(ev, data){
    console.log('we connected y\'all')
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
        if($scope.thisSession.isActive){
          $scope.button = 'END'
        } else {
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

}])
