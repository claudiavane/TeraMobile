<<<<<<< HEAD
var pathOrg = 'http://192.168.51.61:8080/org';
angular.module('starter')

.factory('OutgoingRequest', function($http){
   return {
       get: function(filterUnit){
          return $http.get(pathOrg + "/outgoingrequest/get/", {params:{filterUnit:filterUnit}}).then(function(resp){
=======
//var pathOrg = 'http://192.168.51.61:8080/org';
angular.module('starter')

.factory('OutgoingRequest', function($http, PATH_WS){
   return {
       get: function(filterUnit){
          return $http.get(PATH_WS.org + "/outgoingrequest/get/", {params:{filterUnit:filterUnit}}).then(function(resp){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       }
   }
})
