angular.module('starter')

.controller("SettingsController", function($scope, $rootScope, $state, $translate, utilMessages, utilConstants, User) {
        console.log("SettingsController");
        
        $scope.subdivisions = User.getSubdivisions();
        $scope.subdivision = User.getSubdivisionDefault();
        
        $scope.languages = utilConstants.getLanguages();
        $scope.language = {
					        id: 'en',
					        name: 'English'
					      }; 
                         //$scope.languages[1];

        $scope.isSelectedSubdivision = function(item) {
			if(item.id === $scope.subdivision.id) return true;
			else return false;
		}
		$scope.isSelectedLanguage = function(item) {
			console.log("$scope.language.id " + $scope.language.id);
			if(item.id === $scope.language.id) return true;
			else return false;
		}
		$scope.saveSettigns = function(){
			$rootScope.subdivision = $scope.subdivision;
			$rootScope.languageCode = $scope.language.id;

			console.log("$rootScope.languageCode " + $rootScope.languageCode);
			
            $translate.use($scope.language.id);        	 
		}

		/* SETTINGS LANGUAGES */
            //$scope.languages = $rootScope.settings.languages;
            //$scope.selectLanguage = $rootScope.settings.languages[0];
         
 });