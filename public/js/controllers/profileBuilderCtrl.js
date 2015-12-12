angular.module('concerto').controller('profileBuilderCtrl', ['profileService', 'authService', '$scope', '$http', function(profileService, authService, $scope, $http){
  // $scope.user = authService.getUser();
  $scope.showUserType = true;
  $scope.showFacebookData = false;
  $scope.images = [];
  $scope.likesArray = [];
  $scope.schools = [];
  $scope.submitUserType = function(){
    profileService.updateUser($scope.user._id, { usertype: $scope.usertype}).then(function(response){
      console.log(response.data)
      $scope.$emit('userUpdated', response.data);
      $scope.showUserType = false;
      $scope.showFacebookData = true;
      console.log(typeof $scope.user._id)
      console.log($scope.user._id)
      if($scope.usertype === 'Student'){
        profileService.addStudent($scope.user._id).then(function(response){
          console.log(response)
        },
        function(err){
          console.log(err)
        })
      } else if($scope.usertype === 'Instructor'){
        console.log(typeof $scope.user._id)
        console.log($scope.user._id)
        profileService.addInstructor($scope.user._id).then(function(response){
          console.log(response)
        },
        function(err){
          console.log(error)
        })
      }
    },
    function(err){
      console.log(err);
    })
  }
  $scope.submitFacebookData = function(){
    $scope.likesArray.map(function(like){
      (like.selected) ? profileService.addLike(like).then(function(response){
        console.log(response)
      }, function(err){
        console.log(err)
      }) : null;
    })
    $scope.schools.map(function(school){
      (school.selected) ? profileService.addSchool(school).then(function(response){
        console.log(response)
      }, function(err){
        console.log(err)
      }) : null;
    })
    $scope.images.map(function(image){
      (image.selected) ? profileService.addImage(image).then(function(response){
        console.log(response)
      }, function(err){
        console.log(err)
      }) : null;
    })
    $scope.$emit('Profile Built!')
  }
  $scope.getLikes = function(){
    profileService.getLikes($scope.user._id).then(function(response){
      $scope.likes = response.data.content
      $scope.likes.map(function(like){
        return $http({
          method: 'GET',
          url: '/likes/data/' + like.id
        }).then(
          function(response){
            $scope.likesArray.push({
              user: $scope.user._id,
              id: like.id,
              name: like.name,
              image: response.data.location})
          },
          function(err){
            console.log(err)
          }
        )
      })
    })
  }
  $scope.getEducation = function(){
    profileService.getEducation($scope.user._id).then(function(response){
      $scope.education = response.data.content;
      $scope.education.map(function(school){
        console.log(school);
        return $http({
          method: 'GET',
          url: '/education/data/' + school.school.id
        }).then(
          function(response){
            $scope.schools.push({
              user: $scope.user._id,
              id: school.school.id,
              name: school.school.name,
              image: response.data.location})
          },
          function(err){
            console.log(err)
          }
        )
      })
    })
  }
  $scope.getPhotos = function(){
    profileService.getPhotos($scope.user._id).then(function(response){
      $scope.photos = response.data.content;
      $scope.photos.map(function(photo){
        return $http({
          method: 'GET',
          url: '/photos/images/' + photo.id
        }
      ).then(function(response){
        var img = response.data[response.data.length - 1].source
        console.log(img)
        $scope.images.push({
          user: $scope.user._id,
          image: img,
          id: photo.id
      },function(err){
          console.log(err)
        })
      })
    })}
  )}

  $scope.getLikes();
  $scope.getEducation();
  $scope.getPhotos();
}])
