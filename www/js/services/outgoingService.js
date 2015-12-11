var pathOrg = 'http://192.168.51.51:8080/org';
angular.module('starter')

.factory('OutgoingRequest', function($http){
   return {
       get: function(filterUnit){
          return $http.get(pathOrg + "/outgoingrequest/get/", {params:{filterUnit:filterUnit}}).then(function(resp){
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       }
   }
})
