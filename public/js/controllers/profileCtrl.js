angular.module('concerto').controller('profileCtrl', [ '$scope', '$state', 'authService', 'profileService', 'sectionService', function($scope, $state, authService, profileService, sectionService){
  $scope.hideProfileBuilder = true;
  // if(authService.getUser() === null){
  //   $state.go('login')
  // }
  $scope.$emit('loggedIn')
  if($scope.user.usertype === 'Instructor'){
    $scope.isStudent = false
  } else {
    $scope.isStudent = true;
  }
  if($scope.user.logins < 2){
    $scope.hideProfileBuilder = false;
  }
  $scope.$on('Profile Built!', function(){
    $scope.hideProfileBuilder = true;
  })
  $scope.hideEnrollment = true;
  $scope.hideEnrollmentModal = function(){
    $scope.hideEnrollment = !$scope.hideEnrollment
    $scope.getAvailableCourses()
  }
  $scope.getuserInfo = function(){
    if($scope.isStudent === false){
      sectionService.getInstructorUser($scope.user._id).then(
        function(response){
          $scope.userInfo = response.data
          $scope.$emit('StudentLoaded', $scope.userInfo)
        },
        function(err){
          console.log(err)
        }
      )
    } else {
      profileService.getStudentUser($scope.user._id).then(
        function(response){
          $scope.userInfo = response.data
          $scope.$emit('StudentLoaded', $scope.userInfo)
        },
        function(err){
          console.log(err)
        }
      )
    }


  }
  // $scope.goToCourseSection = function(id, course){
  //   $scope.selectedCourse = course;
  //   $state.go('auth.section', {id: id})
  // }
  $scope.countCertainDays = function(days, d0, d1 ) {
   d0 = new Date(d0)
   d1 = new Date(d1)
   var ndays = 1 + Math.round((d1-d0)/(24*3600*1000));
   var sum = function(a,b) {
     return a + Math.floor( (ndays+(d0.getDay()+6-b) % 7 ) / 7 ); };
   $scope.sessionCount = days.reduce(sum,0);
   }
   $scope.sessionCount = 0;
  $scope.showSectionModal = false;
  $scope.hideSectionModal = function(){
    $scope.showSectionModal = !$scope.showSectionModal
  }
  $scope.newSection = {}
  $scope.newSection.scheduleDays = [];
  $scope.newSection.days = [false, false, false, false, false]
  var days = ['M','T','W','R','F']
  var allDays = ['S','M','T','R','F','Su']
  $scope.selectDay = function(index){
    $scope.newSection.days[index] = !$scope.newSection.days[index]
    $scope.newSection.scheduleDays = $scope.newSection.days.map(function(val, ind, arr){
      if(val){
        return days[ind]
      } else {
        return ''
      }
    }).filter(function(val){
      return val
    })
    $scope.dayIndex = allDays.map(function(day, ind, array){
      if($scope.newSection.scheduleDays.indexOf(day) > -1){
        return ind
      } else {
        return ''
      }
    }).filter(function(day){
      return day
    })
    $scope.newSection.frequency = $scope.newSection.scheduleDays.length
  }
  $scope.getuserInfo();
  $scope.getAvailableCourses = function(){
    sectionService.getSections().then(function(response){
      console.log(response);
      $scope.availableCourses = response.data.filter(function(course){
          return course.prospectiveStudents.indexOf($scope.userInfo._id) === -1 && course.students.indexOf($scope.userInfo._id) === -1
      })
    },
    function(err){
      console.log(err)
    }
    )
  }
  $scope.requestedCourses = []
  $scope.requestToggle = {}
  $scope.addToRequestedCourses = function(sectionId){
    profileService.requestEnrollment(sectionId, {studentId: $scope.userInfo._id})
      .then(function(response){
        $scope.getAvailableCourses()
      })
  }


 $scope.submitCourseAndSections = function(){
   console.log($scope.newCourse)
    sectionService.addCourse($scope.newCourse).then(
      function(response){
        console.log('Course Submitted', response.data);
        $scope.newSection.courseId = response.data._id
        $scope.newSection.instructor = $scope.user._id
        sectionService.getInstructorUser($scope.user._id).then(
          function(response){
            console.log(response)
            $scope.newSection.instructor = response.data._id
            sectionService.addSection($scope.newSection).then(
              function(response){
                // console.log('Section Submitted', response.data)
                for(var i = 0; i < $scope.sessionCount; i++){
                  sectionService.addSession({
                    sectionId: response.data._id,
                    sessionNumber: i + 1
                  }).then(function(response){
                    // console.log('SESSION RESPONSE', response)
                    sectionService.addSessionChat({
                      sessionId: response.data._id
                    }).then(function(response){
                      console.log('You added sessions and sessionchats!')
                    })
                  })
                }
                sectionService.updateInstructor($scope.newSection.instructor, { _id: response.data._id}).then(
                  function(response){
                    console.log('we tried to update the instructor, but ', response.data)
                    $scope.userInfo.Courses = response.data.courses
                    $scope.newSection = {};
                    $scope.newCourse = {};
                    $scope.getuserInfo();
                    $scope.hideSectionModal();
                  }
                  )
                },function(err){
                console.log(err)
                }
              ), function(err){
            console.log(err)
            }
          }
          )},
          function(err){
            console.log(err)
          }
        )
      }
}])
