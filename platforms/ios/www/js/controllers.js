angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopup, User, AUTH_EVENTS) {

  console.log("AppCtrl.. ");
  $scope.username = User.username();
  
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    User.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('MenuCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicHistory, User, AUTH_EVENTS) {
    console.log("MenuCtrl..");
    $scope.logout = function() {
      User.logout();
      $rootScope.subdivision = undefined;

      //$state.go('login');
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();

      $state.go('login', {}, {reload: true});

    };



})
;
