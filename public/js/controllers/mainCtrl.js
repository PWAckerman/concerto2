angular.module('concerto').controller('mainCtrl', ['$scope', 'authService', '$timeout', '$state', function($scope, authService, $timeout, $state){
  // socket.forward('userEmitted', $scope)
  // socket.forward('loggedOut', $scope)
  //wavething

  //wave thing
  $scope.getUser = function(){
    authService.getAuthedUser().then(function(response){
      if(response){
        $scope.user = response;
        $scope.$emit('loggedIn')
      }
    });
  }
  $scope.getUser();
  $scope.getSubMenu = function(course){
    $scope.selectedCourse = course;
    $scope.days = ['M','T','W','R','F'].map(function(day){
      return $scope.selectedCourse.scheduleDays.indexOf(day) < 0 ? false : true
    })
    console.log($scope.days)
  }
  $scope.goToCourseSection = function(id, course){
    $scope.selectedCourse = course;
    $state.go('auth.section', {id: id})
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
  $scope.$on('loggedIn', function(ev){
    // $scope.user = authService.getUser().then(function(response){ return response});
    $scope.showMenu = true;
    $scope.toast.good = 'You logged in!';
    $scope.toast.bad = '';
    $scope.hideGoodToast = false;
    $scope.connectionOpen++;
    $timeout(function(){
      console.log('did it')
      $scope.hideGoodToast = true;
    }, 5000)
    $state.go('auth.profile')
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
  // $scope.$on('$destroy', function(){
  //   socket.disconnect()
  // })
  $scope.$on('$locationChangeStart', function(event) {
    $scope.hideLoading = false;
    $timeout(function(){
      $scope.hideLoading = true;
    }, 4000)
  });
  $scope.hideLoading = true;
  $scope.$on('StudentLoaded', function(ev, student){
    $scope.navInfo = student;

  })
  $scope.days = [true, false, true, false, true]
}])
