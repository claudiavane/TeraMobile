var pathOrg = 'http://localhost:8080/org';
angular.module('starter')

.factory('IncomingRequest', function($http){
   return {
       get: function(filterUnit){
          return $http.get(pathOrg + "/incomingrequest/get/", {params:{filterUnit:filterUnit}}).then(function(resp){
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       }
   }
})
