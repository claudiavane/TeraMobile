//var pathOrg = 'http://192.168.51.61:8080/org';
angular.module('starter')

.factory('OutgoingRequest', function($http, PATH_WS){
   return {
       get: function(filterUnit){
          return $http.get(PATH_WS.org + "/outgoingrequest/get/", {params:{filterUnit:filterUnit}}).then(function(resp){
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       }
   }
})
