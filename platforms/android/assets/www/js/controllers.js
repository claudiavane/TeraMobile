angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopup, User, AUTH_EVENTS) {

  $scope.username = User.username();
  console.log("AppCtrl.. ");

  
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
<<<<<<< HEAD
<<<<<<< HEAD

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
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
=======
=======

.controller('MenuCtrl', function($scope, $state, $ionicPopup, User, AUTH_EVENTS) {
    console.log();
    $scope.logout = function() {
      User.logout("MenuCtrl..");
      $state.go('login');
    };

})
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
;
>>>>>>> 2510628cc604afda0f4be608fdb320ef3cf9f664
