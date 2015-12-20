angular.module('concerto').service('authService', ['$rootScope', '$http', 'socket', '$q', function($rootScope, $http, socket, $q){
  // socket.forward('userEmitted', $rootScope)
  // socket.forward('loggedOut', $rootScope)
  var user = null;
  // $rootScope.$on('socket:userEmitted', function(ev, data){
  //   console.log(data);
  //   user = data;
  //   $rootScope.$broadcast('loggedIn');
  //   socket.disconnect()
  // })
  // $rootScope.$on('socket:loggedOut', function(ev, data){
  //   user = null;
  //   $rootScope.$broadcast('loggedOut');
  //   socket.disconnect()
  // })
  // $rootScope.$on('userUpdated', function(ev, data){
  //   user = data;
  // })
  this.getAuthedUser = function(){
      var dfd = $q.defer()
      if(user){
        dfd.resolve(user);
      } else {
        $http({
          method: 'GET',
          url: '/authed/me'
        }).then(function(res){
          user = res.data;
          console.log('Result getting the logged in user', res);
          $rootScope.$broadcast('loggedIn')
          dfd.resolve(res.data);
        })
      }
      return dfd.promise;
    };
}])
