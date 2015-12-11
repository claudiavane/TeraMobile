var pathOrg = 'http://192.168.51.61:8080/org';

angular.module('starter')

.factory('User', function($http) {
    var result;
    var userInfo = [];
    var subdivisions = [];

    return {
       login: function(user){
          return $http.get(pathOrg + "/user/login/", {params:{"username": user.username, "password": user.password}}).then(function(resp){
               result = resp.data
               return result;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
       },
       getSubdivisions: function(user){
            userInfo = result.response;
            var item;
            var subdivision = {id: null, name: ''};

            for (var i = 0; i < userInfo.length; i++) {
                if (i === 0) {
                    item = userInfo[i];
                }
                if (item.subdivision_id !== userInfo[i].subdivision_id) {
                    subdivision.id = userInfo[i].subdivision_id;
                    subdivision.name = userInfo[i].subdivision_desc;
                    subdivisions.push(subdivision);
                };
            };
            return subdivisions;         
        }
    }
    
})
;