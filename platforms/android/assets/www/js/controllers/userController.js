angular.module('starter')

.controller("LoginController", function($scope, $rootScope, $state, utilMessages, User) {
        console.log("LoginController");

        $scope.$on("$stateChangeSuccess", function() {
          $scope.formUser = {
              username: "",
              password: ""
          };

        });
        
<<<<<<< HEAD
=======
        $scope.user = {
            username: "ssimon",
            password: "ssimon",
<<<<<<< HEAD
            languageCode: "es"
=======
            languageCode: $rootScope.languageCode
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
        };
>>>>>>> c25c4a0b1beed33a714321a59ea6848c42a3ebac

       $scope.login = function (user) {
          $rootScope.show('Login...');

          /* Check user fields*/
          if(!user.username || !user.password){
              $rootScope.hide();
              $rootScope.notify('Error','Username or Password is incorrect!');
              return;
          }

          User.login(user).then(function(result){
              utilMessages.validityResponse(result);
              $rootScope.hide();

              if (result.responseCode === 'OK') {
                  // fix session data
                  $rootScope.user = result.response[0];                  
                  $rootScope.subdivision = User.getSubdivisionDefault();
                  $state.go('app.mainMap');
              };          
          });

       };
<<<<<<< HEAD
       
=======
<<<<<<< HEAD
=======

       console.log("LoginController.. fin");
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
>>>>>>> c25c4a0b1beed33a714321a59ea6848c42a3ebac
 });