angular.module('concerto').controller('mainCtrl', ['$scope', 'authService', 'socket', '$timeout', '$state', function($scope, authService, socket, $timeout, $state){
  // socket.forward('userEmitted', $scope)
  // socket.forward('loggedOut', $scope)
  $scope.getUser = function(){
    authService.getUser();
  }
  $scope.connectionOpen = 0
  $scope.showMenu = false;
  $scope.toast = {};
  $scope.hideGoodToast = true;
  $scope.hideBadToast = true;
  // $scope.$on('socket:userEmitted', function(ev, data){
  //   console.log(data);
  //   if($scope.connectionOpen < 1){
  //     $scope.user = data;
  //     $scope.showMenu = true;
  //     $scope.toast.good = 'You logged in!';
  //     $scope.hideGoodToast = false;
  //     $scope.connectionOpen++;
  //     $timeout(function(){
  //       console.log('did it')
  //       $scope.hideGoodToast = true;
  //     }, 5000)
  //   }
  // })
  $scope.$on('loggedIn', function(){
    $scope.user = authService.getUser();
    $scope.showMenu = true;
    $scope.toast.good = 'You logged in!';
    $scope.toast.bad = '';
    $scope.hideGoodToast = false;
    $scope.connectionOpen++;
    $timeout(function(){
      console.log('did it')
      $scope.hideGoodToast = true;
    }, 5000)
    $state.go('profile')
  })
  // $scope.$on('socket:loggedOut', function(ev, data){
  //   console.log(data);
  //   if($scope.connectionOpen > 0){
  //     $scope.user = null;
  //     $scope.showMenu = false;
  //     $scope.toast.good = '';
  //     $scope.toast.bad = data.message;
  //     $scope.hideBadToast = false;
  //     $scope.connectionOpen--;
      // $timeout(function(){
      //   console.log('did it')
      //   $scope.hideBadToast = true;
      // }, 5000)
  //   }
  // })
  $scope.$on('loggedOut', function(){
    $scope.user = authService.getUser()
    $scope.showMenu = false;
    $scope.toast.good = '';
    $scope.toast.bad = 'User Logged Out';
    $scope.hideBadToast = false;
    $timeout(function(){
      console.log('did it')
      $scope.hideBadToast = true;
    }, 5000)
    $state.go('login')
  })
  $scope.$on('$destroy', function(){
    socket.disconnect()
  })
}])
