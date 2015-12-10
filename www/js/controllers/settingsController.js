angular.module('starter')

.controller("SettingsController", function($scope, $rootScope, $state, utilMessages, User) {
        console.log("SettingsController");
        
        $scope.user = {
            username: "ssimon",
            password: "ssimon",
            languageCode: "ES"
        };

       $scope.login = function (user) {
          $rootScope.show('Login...');

          /* Check user fields*/
          if(!user.username || !user.password){
              $rootScope.hide();
              $rootScope.notify('Error','Username or Password is incorrect!');
              return;
          }

          User.login($scope.user).then(function(result){
              utilMessages.validityResponse(result);
              $rootScope.hide();

              if (result.responseCode === 'OK') {
                  // fix session data
                  $state.go('app.mainMap');
              };          
          });

       };
 });