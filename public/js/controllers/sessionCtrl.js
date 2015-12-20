angular.module('concerto').controller('sessionCtrl', ['$scope', 'sessionService', '$stateParams', 'chatSocket', '$http', function($scope, sessionService, $stateParams, chatSocket, $http){
  chatSocket.forward('chatconnected', $scope)
  $scope.$on('socket:chatconnected', function(ev, data){
    console.log('we connected y\'all')
  })
  $scope.thisSession = null;
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
      }
    )
  }
  $scope.getSession();
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
  $scope.checkUser = function(){
    if($scope.thisSession.joined.map(function(user){
          return user._id
        }).indexOf($scope.navInfo._id) > -1){
          $scope.userHasJoined = true
    } else {
      $scope.userHasJoined = false;
    }

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
