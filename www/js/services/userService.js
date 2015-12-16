var pathOrg = 'http://192.168.51.61:8080/org';

angular.module('starter')

.factory('User', function($http) {
    var result;
    var userInfo = [];
    var subdivisions;

    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      username = token.split('.')[0];
      isAuthenticated = true;
      authToken = token;

      if (username == 'admin') {
        role = USER_ROLES.admin
      }
      if (username == 'user') {
        role = USER_ROLES.public
      }

      // Set the token as header for your requests!
      $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }    

    var logout = function() {
      destroyUserCredentials();
    }; 

    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();       
    
    return {
        login: function(user){
          return $http.get(pathOrg + "/user/login/", {params:{"username": user.username, "password": user.password, "userLanguageCode": user.languageCode}}).then(function(resp){
              result = resp.data;
              if (result.responseCode === 'OK') {
                storeUserCredentials(result.response[0].username + '.yourServerToken');
              };              
              return result;
          }, function(error){
              console.log("Request Failed: " + error.data);
          });
        },
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {return isAuthenticated;},
        username: function() {return username;},
        role: function() {return role;},
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