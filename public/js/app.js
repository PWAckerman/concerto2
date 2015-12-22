angular.module('concerto', ['ui.router', 'btford.socket-io', 'ngAnimate', '720kb.datepicker'])
.config(['$stateProvider','$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
  $stateProvider
    .state('auth', {
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          user: function(authService) {
            return authService.getAuthedUser()
          }
        }
      })
    .state('login',{
        url: '/login',
        templateUrl: '../views/login.tpl.html',
        controller: 'mainCtrl',
        resolve: {

        }
      }
    )
    .state('auth.profile',{
        url: '/profile',
        templateUrl: 'views/profile.tpl.html',
        controller: 'profileCtrl',
        resolve: {

        }
      }
    )
    .state('auth.section',{
        url: '/section/:id',
        templateUrl: 'views/section.tpl.html',
        controller: 'sectionCtrl',
        resolve: {
            sessions: function(sectionService, $stateParams){
              return sectionService.getSessions($stateParams.id)
            }
        }
      }
    )
    .state('auth.session',{
        url: '/session/:id',
        templateUrl: 'views/session.tpl.html',
        controller: 'sessionCtrl',
        resolve: {

        }
      }
    )

    $urlRouterProvider.otherwise('login');

    $httpProvider.interceptors.push(function($q, $injector, $location) {
      return {
        // This is the responseError interceptor
        responseError: function(rejection) {
          console.log("BAD DOG", rejection);
          if (rejection.status === 401) {
            document.location = "/#/login";
          }

          /* If not a 401, do nothing with this error.
           * This is necessary to make a `responseError`
           * interceptor a no-op. */
          return $q.reject(rejection);
        }
      };
    });
}])
.factory('chatSocket', function (socketFactory){
  var myIoSocket = io.connect(':3030/roomlist')
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  socketFactory.disconnect = function(){
    ioSocket.disconnect()
  }

  mySocket.forward('error')
  console.log('sockets, bro')
  return mySocket
});
