angular.module('concerto').controller('assignmentCtrl', ['$scope', 'assignmentService', '$stateParams', function($scope, assignmentService, $stateParams){
  $scope.newAssignment = {
    sessionId: $stateParams.id
  };
  $scope.showAssignmentBuilder = false;
  $scope.getAssignment = function(){
    assignmentService.getAssignmentBySession($stateParams.id).then(
      function(response){
        if(response.data.length === 0 && $scope.user.usertype === 'Instructor'){
          console.log('No Assignment Yet!');
          $scope.showAssignmentBuilder = true;
        } else if (response.data.length > 0) {
          $scope.showAssignmentBuilder = false;
          $scope.assignment = response.data;
        }
      }
    )
  }
  $scope.submitAssignment = function(){
    assignmentService.submitAssignment($scope.newAssignment).then(
      function(response){
        $scope.newAssignment = {};
        $scope.getAssignment();
      }
    )
  }
  $scope.getAssignment();
}])
