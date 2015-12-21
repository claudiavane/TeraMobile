angular.module('starter')

.controller("LoginController", function($scope, $rootScope, $state, utilMessages, User) {
        console.log("LoginController");

        $scope.$on("$stateChangeSuccess", function() {
          $scope.formUser = {
              username: "",
              password: ""
          };

        });
        
       $scope.login = function (user) {
          $rootScope.show('Login...');

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
                  //$rootScope.user = result.response[0];
                  //$scope.user = $rootScope.user;
                  //$rootScope.subdivision = User.getSubdivisionDefault();                  
                  $state.go('app.mainMap', {}, {reload: true});                  
                  $scope.setCurrentUser(result.response[0]);
                  
              };          
          });

       };
       
 });