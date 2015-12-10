angular.module('starter')
.controller('OutgoingController',
  [ '$scope',
    function($scope) {
      $scope.items = ["valex", "yeso", "kiddo"];
    }
  ]
);