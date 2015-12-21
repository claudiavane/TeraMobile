angular.module('starter')
 
.constant('PATH_WS', {
	keeper: 'http://demosys.salamancasolutions.com:8534/keeper',
	org: 'http://demosys.salamancasolutions.com:8534/org'
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  nornal: 'normal_role'
});