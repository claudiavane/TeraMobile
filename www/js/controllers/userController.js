angular.module('starter')

.controller("LoginController", function($scope, $rootScope, $state, utilMessages, User) {
        console.log("LoginController");
        
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
                  $rootScope.user = result.response[0];
                  $rootScope.subdivision = User.getSubdivisionDefault();
                  $state.go('app.mainMap');
              };          
          });

       };
 });