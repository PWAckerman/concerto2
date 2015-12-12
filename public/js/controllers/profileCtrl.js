angular.module('concerto').controller('profileCtrl', [ '$scope', '$state', 'authService', 'profileService', function($scope, $state, authService, profileService){
  $scope.hideProfileBuilder = true;
  if(authService.getUser() === null){
    $state.go('login')
  }
  if($scope.user.logins < 1){
    $scope.hideProfileBuilder = false;
  }
  $scope.$on('Profile Built!', function(){
    $scope.hideProfileBuilder = true;
  })
}])
