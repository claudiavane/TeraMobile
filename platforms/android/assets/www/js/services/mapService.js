<<<<<<< HEAD
var pathOrg = 'http://192.168.51.61:8080/org';
var pathKeeper = 'http://192.168.51.61:8080/keeper';
=======
//var pathOrg = 'http://demosys.salamancasolutions.com:8534/org';
//var pathKeeper = 'http://demosys.salamancasolutions.com:8534/keeper';
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d

angular.module('starter')

.factory('MessageType', function() {
  var types = [{
    id: 0,
    name: 'Informative'
  }, {
    id: 1,
    name: 'Keyword answer'
  },{
    id: 2,
    name: 'Campaign'
  }];
  resp = null;

  return {
    all: function() {
      return types;
    },
    get: function(typeId) {
      resp = types;
      for (var i = 0; i < resp.length; i++) {
        if (resp[i].id === parseInt(typeId)) {
          return resp[i];
        }
      }
      return null;
    }
  };
})

.factory('Priority', function() {  
  var priorities = [{
    id: 1,
    name: 'Maximum'
  }, {
    id: 2,
    name: 'Medium'
  },{
    id: 3,
    name: 'Low'
  }];

  return {
    all: function() {
      return priorities;
    },
    get: function(priorityId) {
      for (var i = 0; i < priorities.length; i++) {
        if (priorities[i].id === parseInt(priorityId)) {
          return priorities[i];
        }
      }
      return null;
    }
  };
})

<<<<<<< HEAD
.factory('Keeper', function($http){
=======
.factory('Keeper', function($http, PATH_WS){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
    var keepers;
    var keeper;
    var items;
    return {
      all: function(){
<<<<<<< HEAD
          return $http.get(pathKeeper+"/search/").then(function(resp){
=======
          return $http.get(PATH_WS.keeper+"/search/").then(function(resp){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
              keepers = resp.data; 
              return keepers;             
          }, function(error){
               console.log("Request Failed: " + error.data);
          });
      },
      getKeeper: function(kepperId){
        items = keepers.response;
        for (var i = 0; i < items.length; i++) {
          if (items[i].ID === parseInt(kepperId)) {
            return items[i];             
          }
        }
        return null;
      },
      getDisk: function(id){
<<<<<<< HEAD
        return $http.get(pathKeeper + "/getDisk/", {params:{"id": id}}).then(function(resp){
=======
        return $http.get(PATH_WS.keeper + "/getDisk/", {params:{"id": id}}).then(function(resp){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
      },
      getMemory: function(id){
<<<<<<< HEAD
        return $http.get(pathKeeper + "/getMemory/", {params:{"id": id}}).then(function(resp){
=======
        return $http.get(PATH_WS.keeper + "/getMemory/", {params:{"id": id}}).then(function(resp){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
      }
   }
})

<<<<<<< HEAD
.factory('Cellsite', function($http){
   
   return {
       getCellsites: function(status, zoom, userId){
          return $http.get(pathOrg + "/cellsite/searchCellsiteZoom/", {params:{"status": status, "zoom":zoom,"userId":userId}}).then(function(resp){
=======
.factory('Cellsite', function($http, PATH_WS){
   
   return {
       getCellsites: function(status, zoom, userId){
          return $http.get(PATH_WS.org + "/cellsite/searchCellsiteZoom/", {params:{"status": status, "zoom":zoom,"userId":userId}}).then(function(resp){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
               return resp.data;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       }
   }
})

<<<<<<< HEAD
.factory('AlertMessage', function($http){
   return {
      previewSmsCircle: function(circleMessage){
          return $http.get(pathOrg + "/previewsms/circle/", 
=======
.factory('AlertMessage', function($http, PATH_WS){
   return {
      previewSmsCircle: function(circleMessage){
          return $http.get(PATH_WS.org + "/previewsms/circle/", 
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
            {params:{"message": circleMessage.message, 
            "latitude": circleMessage.lat,
            "longitude": circleMessage.lng,
            "ratio": circleMessage.ratio,
            "deliveryDatetime": circleMessage.deliveryDatetime,
            "userId": circleMessage.userId,
            "subdivisionId": circleMessage.subdivisionId,
            "operations": circleMessage.operatorsId,
            "orgId": circleMessage.orgId,
            "messageType": circleMessage.messageType,
            "zoom": circleMessage.zoom,
            "userLanguageCode": "ES"
          }}).then(function(resp){                            
               return resp.data;
          }, function(error){
               console.log("Request Failed: " + error.data);
          });
      },
      sendSmsCircle: function(circleMessage){
          console.log("message: " + circleMessage.message);
          console.log("lat: " + circleMessage.lat);
          console.log("lng: " + circleMessage.lng);
          console.log("ratio: " + circleMessage.ratio);
          console.log("deliveryDatetime: " + circleMessage.deliveryDatetime);
          console.log("priority.id: " + circleMessage.priority);
          console.log("user_id: " + circleMessage.userId);
          console.log("subdivisionId: " + circleMessage.subdivisionId);
          for (var i = 0; i < circleMessage.operatorsId.length; i++) {
            console.log("op i" + circleMessage.operatorsId[i]);
          };
          console.log("orgId: " + circleMessage.orgId);
          console.log("messageType: " + circleMessage.messageType);
          console.log("zoom: " + circleMessage.zoom);
          console.log("endDeliveryDateTime: " + circleMessage.endDeliveryDateTime);
          
<<<<<<< HEAD
          return $http.get(pathOrg + "/sendsms/circle/", 
=======
          return $http.get(PATH_WS.org + "/sendsms/circle/", 
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
            {params:{"message": circleMessage.message, 
            "latitude": circleMessage.lat,
            "longitude": circleMessage.lng,
            "ratio": circleMessage.ratio,
            "deliveryDatetime": circleMessage.deliveryDatetime,
            "priority": circleMessage.priority,
            "userId": circleMessage.userId,
            "subdivisionId": circleMessage.subdivisionId,
            "operations": circleMessage.operatorsId,
            "orgId": circleMessage.orgId,
            "messageType": circleMessage.messageType,
            "zoom": circleMessage.zoom,
            "endDeliveryDateTime": null,
            "userLanguageCode": "ES"
          }}).then(function(resp){                            
               return resp.data;
          }, function(error){
               console.log("Request Failed: " + error.data);
          });
      }
   }
})


<<<<<<< HEAD
.factory('Operator', function($http){
   var result;
   return {
      all: function(){
          return $http.get(pathOrg + "/operation/search/").then(function(resp){
=======
.factory('Operator', function($http, PATH_WS){
   var result;
   return {
      all: function(){
          return $http.get(PATH_WS.org + "/operation/search/").then(function(resp){
>>>>>>> 122b6acccc668b1b7483961ad0b8d749ad9aa66d
               return resp.data;
          }, function(error){
               console.log("Request Failed: " + error.data);
          });
      }
   }
})

.factory('MapService', function($resource) {
  
});