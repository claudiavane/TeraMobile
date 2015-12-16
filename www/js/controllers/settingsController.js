angular.module('starter')
.controller("SettingsController", function($scope, $rootScope, $state, $translate, utilMessages, utilConstants, User) {
        
        $scope.subdivisions = User.getSubdivisions();
        $scope.subdivision = User.getSubdivisionDefault();        
        $scope.languages = utilConstants.getLanguages();
        $scope.language = { id: 'en',
					        name: 'English'
					      }; 

        $scope.isSelectedSubdivision = function(item) {
			if(item.id === $scope.subdivision.id) return true;
			else return false;
		}
		$scope.isSelectedLanguage = function(item) {
			if(item.id === $scope.language.id) return true;
			else return false;
		}
		$scope.saveSettigns = function(){
			$rootScope.subdivision = $scope.subdivision;
			$rootScope.languageCode = $scope.language.id;

            $translate.use($scope.language.id);        	 
		}
         
 });