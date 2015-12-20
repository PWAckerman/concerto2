angular.module('concerto').service('profileService', ['$http', function($http){
  this.updateUser = function(userId, data){
    return $http({
      method: 'PATCH',
      url: '/users/' + userId,
      data: data
    })
  }
  this.addInstructor = function(userId){
    console.log(userId)
    return $http({
      method: 'POST',
      url: '/instructorusers',
      data: {
        Courses: [],
        UID: userId
      }
    })
  }
  this.requestEnrollment = function(sectionId, data){
    console.log(sectionId)
    console.log(data)
    return $http({
      method: 'POST',
      url: '/section/enrollment/' + sectionId,
      data: data
    })
  }
  this.getStudentUser = function(userId){
    console.log(userId)
    return $http({
      method: 'GET',
      url: '/studentusers/' + userId
    })
  }
  this.addStudent = function(userId){
    console.log(userId)
    return $http({
      method: 'POST',
      url: '/studentusers',
      data: {
        Courses: [],
        UID: userId
      }
    })
  }
  this.getLikes = function(userId){
    return $http({
      method: 'GET',
      url: '/likes/' + userId
    })
  }
  this.addLike = function(like){
    return $http({
      method: 'POST',
      url: '/fb/likes/',
      data: like
    })
  }
  this.addImage = function(image){
    return $http({
      method: 'POST',
      url: '/fb/images/',
      data: image
    })
  }
  this.addSchool = function(school){
    return $http({
      method: 'POST',
      url: '/fb/schools/',
      data: school
    })
  }
  this.getEducation = function(userId){
    return $http({
      method: 'GET',
      url: '/education/' + userId
    })
  }
  this.getPhotos = function(userId){
    return $http({
      method: 'GET',
      url: '/photos/' + userId
    })
  }
}])
