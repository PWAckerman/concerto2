angular.module('concerto').controller('sectionCtrl', ['$scope','$stateParams','$state','sectionService','authService', 'sessions', function($scope, $stateParams, $state, sectionService, authService, sessions){
  $scope.getSectionGroups = function(){
    sectionService.getGroups($stateParams.id).then(
      function(response){
        $scope.groups = response.data
      },
      function(err){
        console.log(err);
      }
    )
  }
  console.log(sessions)
  $scope.sessions = sessions.data;
  $scope.addSectionGroup = function(){
    $scope.newGroup.members = $scope.newGroup.members.map(
      function(member){
        return member._id
      }
    )
    console.log($scope.newGroup)
    sectionService.addGroup($scope.newGroup).then(
      function(response){
        $scope.newGroup.members = [];
        $scope.newGroup.groupName = '';
        $scope.getSectionGroups();
      },
      function(err){
        console.log(err)
      }
    );

  }
  $scope.getStudents = function(){
    sectionService.getSection($stateParams.id).then(
      function(response){
        $scope.students = response.data.students
        $scope.prospectiveStudents = response.data.prospectiveStudents
      },
      function(err){
        console.log(err)
      }
    )
  }
  $scope.getStudents()
  $scope.getSectionGroups();
  $scope.newGroup = {courseId: $scope.selectedCourse.courseId._id,
                     sectionId: $stateParams.id
                    }
  $scope.newGroup.members = [];
  $scope.hideGroupModal = function(){
    $scope.showGroupModal = !$scope.showGroupModal
  }
  $scope.denyStudent = function(sectionId, student){
    sectionService.denyEnrollment(sectionId, {studentId: student}).then(
      function(response){
        $scope.getStudents()
      }
    )
  }
  $scope.approveStudent = function(sectionId, student){
    sectionService.approveEnrollment(sectionId, {studentId: student}).then(
      function(response){
        console.log('COURSE ID? ', response.data);
        sectionService.updateStudentUser(student, {courseId: response.data._id}).then(
          function(response){
            console.log('STUDENT ARRAY?', response.data)
          }
        )
        $scope.getStudents()
      }
    )
  }

  $scope.showGroupModal = false;
  $scope.addStudentToGroup = function(student){
    $scope.newGroup.members.push(student)
  }
  $scope.removeStudent = function(member){
    $scope.newGroup.members = $scope.newGroup.members.filter(function(student){
      return member._id !== student._id
    })
  }
}])
