angular.module('starter')
 
.constant('PATH_WS', {
	keeper: 'http://localhost:8080/keeper',
	org: 'http://localhost:8080/org'
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});