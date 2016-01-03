angular.module('concerto').controller('assignmentgradeCtrl', ['$scope', '$state', '$stateParams', 'submissions', 'gradeService', 'submissionService', function($scope, $state, $stateParams, submissions, gradeService, submissionService){
  if($scope.user.usertype !== 'Instructor'){
    $state.go('login')
  }
  $scope.value = ''
  $scope.grade = {
    instructorId: $scope.user._id
  }
  $scope.showGradeModal = false;
  $scope.submissions = submissions.data.filter(
    function(submission){
      return submission.isGraded === false;
    });
  $scope.selectedSubmission = ''
  $scope.toggleGradeModal = function(){
    $scope.showGradeModal = !$scope.showGradeModal
  }
  $scope.selectSubmission = function(submission){
    $scope.selectedSubmission = submission;
    $scope.grade.studentId = submission.studentId._id;
    $scope.grade.assignmentId = $stateParams.id
    $scope.grade.submissionId = submission._id;
    $scope.grade.value = $scope.value;
    $scope.toggleGradeModal()
  }
  $scope.submitGrade = function(){
    $scope.grade.value = $scope.value;
    gradeService.submitGrade($scope.grade).then(
      function(response){
        $scope.value = '';
        submissionService.toggleIsGraded($scope.selectedSubmission._id).then(
          function(response){
            console.log(response.data)
            submissionService.getSubmissions($stateParams.id).then(
              function(response){
                console.log(response.data)
                $scope.submissions = response.data.filter(
                  function(submission){
                    return submission.isGraded === false;
                  }
                )
              }
            )
          }
        )
        $scope.toggleGradeModal();
      }
    )
  }
}])

// created: { type: Date, default: Date.now},
// studentId: {type: String, ref: 'User'},
// instructorId: {type: String, ref: 'User'},
// value: {type: Number, min: 0, max: 100},
// assignmentId: String,
// submissionId: {type: String, ref: 'Submission'},
// gradeId: ObjectId
