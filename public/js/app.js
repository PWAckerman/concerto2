angular.module('concerto', ['ui.router', 'btford.socket-io', 'ngAnimate'])
.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider, authService){
  $stateProvider
    .state('login',{
        url: '/login',
        templateUrl: '../views/login.tpl.html',
        controller: 'mainCtrl',
        resolve: {

        }
      }
    )
    .state('profile',{
        url: '/profile',
        templateUrl: 'views/profile.tpl.html',
        controller: 'profileCtrl',
        resolve: {

        }
      }
    )
    .state('state3',{
        url: '/state3',
        templateUrl: 'state3/state.tpl.html',
        controller: 'state3Ctrl',
        resolve: {

        }
      }
    )
    .state('state4',{
        url: '/state4',
        templateUrl: 'state4/state.tpl.html',
        controller: 'state4Ctrl',
        resolve: {

        }
      }
    )

    $urlRouterProvider.otherwise('login');
}])
.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect(':3030');
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  socketFactory.disconnect = function(){
    ioSocket.disconnect()
  }
  mySocket.forward('error');
  return mySocket;
});
