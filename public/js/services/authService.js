angular.module('concerto').service('authService', ['$rootScope', '$http', 'socket', function($rootScope, $http, socket){
  socket.forward('userEmitted', $rootScope)
  socket.forward('loggedOut', $rootScope)
  var user = null;
  $rootScope.$on('socket:userEmitted', function(ev, data){
    console.log(data);
    user = data;
    $rootScope.$broadcast('loggedIn');
    socket.disconnect()
  })
  $rootScope.$on('socket:loggedOut', function(ev, data){
    user = null;
    $rootScope.$broadcast('loggedOut');
    socket.disconnect()
  })
  $rootScope.$on('userUpdated', function(ev, data){
    user = data;
  })
  this.getUser = function(){
    return user;
  }
}])
