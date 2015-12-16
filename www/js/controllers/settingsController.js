angular.module('starter')

.controller("SettingsController", function($scope, $rootScope, $state, utilMessages, utilConstants, User) {
        console.log("SettingsController");
        
        $scope.subdivisions = User.getSubdivisions();
        $scope.subdivision = User.getSubdivisionDefault();
        
        $scope.languages = utilConstants.getLanguages();
        $scope.language = $scope.languages[1];

        $scope.isSelectedSubdivision = function(item) {
			if(item.id == $scope.subdivision.id) return true;
			else return false;
		}
		$scope.isSelectedLanguage = function(item) {
			if(item.id == $scope.language.id) return true;
			else return false;
		}
		$scope.saveSettigns = function(){
			$rootScope.subdivision = $scope.subdivision;
			$rootScope.languageCode = $scope.language;
		}
 });