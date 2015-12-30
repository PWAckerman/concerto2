angular.module('concerto').service('sessionService', ['$http', function($http){
  this.getSession = function(id){
    return $http({
      method: 'GET',
      url: 'sessions/' + id
    })
  }
  this.getSessionChat = function(sessionId){
    return $http({
      method: 'GET',
      url: 'sessionchats/bysession/' + sessionId
    })
  }
  this.getSessionMessageBySessionChat = function(sessionChatId){
    return $http({
      method: 'GET',
      url: 'sessionmessages/bysessionchat/' + sessionChatId
    })
  }
  this.toggleActive = function(id, value){
    return $http({
      method: 'PATCH',
      url: 'sessions/' + id,
      data: {value: value}
    })
  }
  this.joinSession = function(userId, id){
    return $http({
      method: 'PATCH',
      url: 'sessions/join/' + id,
      data: {userId: userId}
    })
  }
  this.leaveSession = function(userId, id){
    return $http({
      method: 'PATCH',
      url: 'sessions/exit/' + id,
      data: {userId: userId}
    })
  }
}])
