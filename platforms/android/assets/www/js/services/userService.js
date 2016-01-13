
angular.module('starter')

.factory('User', function($http, $rootScope, PATH_WS, USER_ROLES, utilMessages) {
    var result;
    var userInfo = [];
    var subdivisions;

    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var username = '';
    var user = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      
      if (token) {
        useCredentials(token);
      }
    }
    function storeUserCredentials(userData) {
      var token = JSON.stringify(userData);
      //var token = userData.user_id + '.yourServerToken';
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
      user = userData;

    }
    function useCredentials(token) {

      var user_saved = JSON.parse(token);
      user = user_saved;
      isAuthenticated = true;
      authToken = token;
      
      if (username == 'ssimon') role = USER_ROLES.admin
      else role = USER_ROLES.normal
      
      // Set the token as header for your requests!
      $http.defaults.headers.common['X-Auth-Token'] = token;
    }
    function getUser(userId){
        console.log("$rootScope.languageCode " + $rootScope.languageCode);
        return $http.get(PATH_WS.org + "/user/getUser/", {params:{
            "userId": userId, 
            "userLanguageCode": $rootScope.languageCode}}).then(function(resp){
                result = resp.data;
                utilMessages.validityResponse(result);
                if (result.responseCode === 'OK') {
                    user = result.response;
                }
                return user;
        }, function(error){
            console.log("getUser Failed: " + error.data);
        });
    }
    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      user = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }    
    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();       
    
    return {
        login: function(user, languageCode){
            return $http.get(PATH_WS.org + "/user/login/", {params:{
              "username": user.username,
              "password": user.password, 
              "userLanguageCode": languageCode}}).then(function(resp){
                  result = resp.data;
                  if (result.responseCode === 'OK') {
                    storeUserCredentials(result.response[0]);
                  };              
                  return result;
            }, function(error){
                console.log("Login Failed: " + error.data);
            });
        },
        logout: function() {
                  console.log("logout...");
                  destroyUserCredentials();
                },
        isAuthorized: isAuthorized,
        isAuthenticated: function() {return isAuthenticated;},
        username: function() {return username;},
        role: function() {return role;},
        user: function() {return user;},
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
                      item = userInfo[i];
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