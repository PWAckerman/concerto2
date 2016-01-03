angular.module('concerto').service('gradeService', ['$http', function($http){
  this.findGrade = function(submissionId){
    return $http({
      method: 'GET',
      url: '/grades/submissions/' + submissionId
    })
  }
  this.submitGrade = function(grade){
    return $http({
      method: 'POST',
      url: '/grades',
      data: grade
    })
  }
}])
