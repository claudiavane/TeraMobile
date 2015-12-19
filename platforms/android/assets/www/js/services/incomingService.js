//var pathOrg = 'http://demosys.salamancasolutions.com:8534/org';
angular.module('starter')

.factory('IncomingRequest', function($http, PATH_WS){
   return {
       get: function(filterUnit){
          return $http.get(PATH_WS.org + "/incomingrequest/get/", {params:{filterUnit:filterUnit}}).then(function(resp){
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       }
   }
})
