angular.module('starter')

.controller("SettingsController", function($scope, $rootScope, $state, utilMessages, User) {
        console.log("SettingsController");
        

        User.getSubdivisions().then(function(result){
              
              

                       
          });
 });