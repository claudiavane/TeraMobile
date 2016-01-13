angular.module('starter')

.controller("LoginController", function($scope, $rootScope, $state, $translate, utilMessages, User) {
        console.log("LoginController");

        $scope.$on("$stateChangeSuccess", function() {
          $scope.formUser = {
              username: "",
              password: ""
          };

        });
        
       $scope.login = function (user) {
          var txtLogin = $translate('LOGIN');
          $rootScope.show(txtLogin);

          if(!user.username || !user.password){
              $rootScope.hide();
              $rootScope.notify('Error','Username or Password is incorrect!');
              return;
          }
          var languageCode = $rootScope.languageCode;
          User.login(user, languageCode).then(function(result){
              utilMessages.validityResponse(result);
              $rootScope.hide();

              if (result.responseCode === 'OK') {
                  $rootScope.subdivision = User.getSubdivisionDefault();                  
                  $state.go('app.mainMap', {}, {reload: true});                  
                  $scope.setCurrentUser(result.response[0]);
                  
              };          
          });

       };
       
 });