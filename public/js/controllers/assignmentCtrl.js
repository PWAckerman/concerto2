angular.module('concerto').controller('assignmentCtrl', ['$scope', 'assignmentService', '$stateParams', '$state', 'submissionService', 'gradeService', function($scope, assignmentService, $stateParams, $state, submissionService, gradeService){
  $scope.newAssignment = {
    sessionId: $stateParams.id
  };
  $scope.newSubmission = {
    sessionId: $stateParams.id,
    studentId: $scope.user._id,
    content: ''
  }
  $scope.showSubmission = false;
  $scope.showAssignmentBuilder = false;
  $scope.showSubmissionButton = false;
  $scope.submissionModal = false;
  $scope.goGrade = function(){
    $state.go('auth.assignmentgrade', {id: $scope.assignment[0]._id})
  }
  $scope.getSubmissionByStudentAndAssignment = function(){
    console.log('Searching by Student and Assignment', $scope.assignment[0]._id, $scope.user._id)
    submissionService.getSubmissionByStudentAndAssignment($scope.assignment[0]._id, $scope.user._id).then(
      function(response){
        console.log('RESPONSE', response.data)
        $scope.studentSubmission = response.data
        if($scope.studentSubmission.length > 0){
          $scope.showSubmissionButton = false;
          $scope.showSubmission = true;
          if($scope.studentSubmission[0].isGraded === true){
            gradeService.findGrade($scope.studentSubmission[0]._id).then(
              function(response){
                $scope.studentSubmission[0].grade = response.data.value
              }
            )
          } else {
            $scope.studentSubmission[0].grade = 'N/A'
          }
        }
      }
    )
  }
  $scope.getAssignment = function(){
    assignmentService.getAssignmentBySession($stateParams.id).then(
      function(response){
        if(response.data.length === 0 && $scope.user.usertype === 'Instructor'){
          console.log('No Assignment Yet!');
          $scope.showAssignmentBuilder = true;
        } else if (response.data.length > 0 && $scope.user.usertype === 'Instructor') {
          $scope.showAssignmentBuilder = false;
          $scope.assignment = response.data;
        } else if (response.data.length > 0 && $scope.user.usertype === 'Student') {
          $scope.showSubmissionButton = true;
          $scope.assignment = response.data;
          $scope.getSubmissionByStudentAndAssignment();
        }
      }
    )
  }
  $scope.showSubmissionModal = function(){
    $scope.submissionModal = !$scope.submissionModal
    console.log($scope.submissionModal)
  }
  $scope.submitAssignment = function(){
    assignmentService.submitAssignment($scope.newAssignment).then(
      function(response){
        $scope.newAssignment = {};
        $scope.getAssignment();
      }
    )
  }

  $scope.submitSubmission = function(){
    $scope.newSubmission.assignmentId = $scope.assignment[0]._id
    submissionService.submitSubmission($scope.newSubmission).then(
      function(response){
        $scope.newSubmission.content = '';
        $scope.showSubmissionModal();
      }
    )
  }

  $scope.getAssignment();
}])
