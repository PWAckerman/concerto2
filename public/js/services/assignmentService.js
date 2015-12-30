angular.module('concerto').service('assignmentService',['$http', function($http){
  this.getAssignmentBySession = function(id){
    return $http({
      method: 'GET',
      url: 'assignments/' + id
    })
  }
  this.submitAssignment = function(assignment){
    return $http({
      method: 'POST',
      url: 'assignments/',
      data: assignment
    })
  }
}])
