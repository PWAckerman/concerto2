angular.module('concerto').service('sectionService', ['$http', function($http){
  this.getSection = function(id){
    return $http({
      method: 'GET',
      url: 'sections/' + id
    })
  }
  this.getSections = function(){
    return $http({
      method: 'GET',
      url: 'sections/'
    })
  }
  this.getTopLike = function(id){
    return $http({
      method: 'GET',
      url: 'toplikes/' + id
    })
  }
  this.getGroups = function(id){
    return $http({
      method: 'GET',
      url: 'sectiongroups/' + id
    })
  }
  this.addGroup = function(data){
    return $http({
      method: 'POST',
      url: 'studentgroups/',
      data: data
    })
  }
  this.addSection = function(data){
    return $http({
      method: 'POST',
      url: 'sections/',
      data: data
    })
  }
  this.getSessions = function(id){
    return $http({
      method: 'GET',
      url: 'section/sessions/' + id
    })
  }
  this.approveEnrollment = function(sectionId, data){
    console.log(sectionId)
    return $http({
      method: 'POST',
      url: '/section/approval/' + sectionId,
      data: data
    })
  }
  this.denyEnrollment = function(sectionId, data){
    console.log(sectionId)
    console.log(data);
    return $http({
      method: 'POST',
      url: '/section/deny/' + sectionId,
      data: data
    })
  }
  this.addCourse = function(data){
    return $http({
      method: 'POST',
      url: '/courses/',
      data: data
    })
  }
  this.addSession = function(data){
    return $http({
      method: 'POST',
      url: '/sessions/',
      data: data
    })
  }
  this.addSessionChat = function(data){
    return $http({
      method: 'POST',
      url: '/sessionchats/',
      data: data
    })
  }
  this.updateInstructor = function(id, data){
    return $http({
      method: 'PATCH',
      url: 'instructorusers/' + id,
      data: data
    })
  }
  this.getInstructorUser = function(id){
    console.log("InstructorId", id)
    return $http({
      method: 'GET',
      url: 'instructorusers/users/' + id
    })
  }
  this.updateStudentUser = function(id, data){
    console.log("StudentId", id)
    console.log("That Data tho", data);
    return $http({
      method: 'PATCH',
      url: 'studentusers/courses/' + id,
      data: data
    })
  }
}])
