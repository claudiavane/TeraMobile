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

.controller('BrowseCtrl', function($scope, $stateParams, Keeper) {
  console.log('Mi BrowseCtrl...');

  Keeper.getKeepers().then(function(result){
    $scope.keepers = result;
    console.log("Result.. ");
      
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  console.log('Mi playlists...');
});
