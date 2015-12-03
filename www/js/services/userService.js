var pathOrg = 'http://demosys.salamancasolutions.com:8534/org';

angular.module('starter')

.factory('User', function($http) {
    var result;
    var userInfo = [];
    var subdivisions;
    
    return {
        login: function(user){
          return $http.get(pathOrg + "/user/login/", {params:{"username": user.username, "password": user.password}}).then(function(resp){
              result = resp.data
              return result;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
        },
        getSubdivisions: function(){
          userInfo = result.response;
          var item;
          var subdivision;
          subdivisions = [];

          for (var i = 0; i < userInfo.length; i++) {
              if (i === 0) {
                  item = userInfo[i];
                  subdivision = {
                    id: item.subdivision_id,
                    name: item.subdivision_desc
                  };
                  subdivisions.push(subdivision);                  
              }else{
                  if (item.subdivision_id !== userInfo[i].subdivision_id) {
                      subdivision = {
                        id: item.subdivision_id,
                        name: item.subdivision_desc
                      };
                      subdivisions.push(subdivision);
                  }
              }
          };
        
          return subdivisions;         
        },
        getSubdivisionDefault: function(){
            userInfo = result.response;
            item = userInfo[0];
            return subdivision = {
                    id: item.subdivision_id,
                    name: item.subdivision_desc
                  };
            
        }
    }
    
})
;