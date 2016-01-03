angular.module('concerto').service('submissionService', ['$http', function($http){
  this.submitSubmission = function(data){
    return $http({
      method: 'POST',
      url: '/submissions',
      data: data
    })
  }
  this.getSubmissions = function(assignmentId){
    return $http({
      method: 'GET',
      url: '/submissions/assignments/' + assignmentId
    })
  }
  this.getSubmission = function(submissionId){
    return $http({
      method: 'GET',
      url: 'submissions/' + submissionId
    })
  }
  this.toggleIsGraded = function(submissionId){
    return $http({
      method: 'PATCH',
      url: 'submissions/' + submissionId
    })
  }
  this.getSubmissionByStudentAndAssignment = function(studentId, assignmentId){
    console.log('/submissions/' + studentId + '/student/' + assignmentId)
    return $http({
      method: 'GET',
      url: '/submissions/' + studentId + '/student/' + assignmentId
    })
  }
}])
