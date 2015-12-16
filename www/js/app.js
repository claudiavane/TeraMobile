// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','leaflet-directive', 'ngCordova', 'starter.controllers', 'ngResource', 'ionic-datepicker'])

.run(function($ionicPlatform, $rootScope, utilMessages) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.user = 12;
    $rootScope.subdivision;
    $rootScope.languageCode = 'en';

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    
  })

  .state('app.outgoing', {
    url: '/outgoing',
    views: {
      'menuContent': {
        templateUrl: 'templates/outgoing.html',
        controller: 'OutgoingController'
      }
    }
  })

  .state('app.incoming', {
    url: '/incoming',
    views: {
      'menuContent': {
        templateUrl: 'templates/incoming.html',
        controller: 'IncomingController'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'ControlsDrawController'
        }
      }
    })

  .state('app.mainMap', {
    url: '/mainMap',
    views: {
      'menuContent': {
        templateUrl: 'templates/mainMap.html',
        controller: 'MapController'          
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsController'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'      
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
