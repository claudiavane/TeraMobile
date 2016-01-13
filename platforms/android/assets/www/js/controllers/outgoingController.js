angular.module('starter')
.controller('OutgoingController',
  [ '$scope',
  	'$rootScope',
  	'$translate',
  	'$filter',
  	'OutgoingRequest',
    function($scope, $rootScope, $translate, $filter, OutgoingRequest) {

    	/*$scope.$on('$ionicView.enter', function(){

    	});*/
        
    	$scope.filterUnits = [
	    	{"value":"HOUR","label":"Last hour"},
	    	{"value":"DAY","label":"Last day"},
	    	{"value":"MONTH","label":"Last month"},
	    	{"value":"YEAR","label":"Last year"},
	    	{"value":"ALL","label":"All"}
    	];
    	$scope.selectedItem = {"value":"DAY","label":"Last day"};
        $scope.updateOutgoingRequestList = function() {
        	var txtUpdating = $filter('translate')('UPDATING');// $translate('UPDATING');
        	$rootScope.show(txtUpdating);
        	console.log($scope.selectedItem.value);
	    	OutgoingRequest.get($scope.selectedItem.value).then(	    		
	    		function(result) {
	                if (result.responseCode == 'OK') {
	                	$scope.items = result.response;
	                } else {
	                	$rootScope.notify(result.responseCode, "Este es un error raro..");		
	                }
	                $rootScope.hide();
	        	}
	        );		   
		}
    	$scope.updateOutgoingRequestList();		
		$scope.isSelected = function(item) {
			if(item.value == $scope.selectedItem.value) return true;
			else return false;
		}
		$scope.getImage = function(status) {
			var image;
			if(status == "PEND") image = "ion-ios-circle-outline";
			else if(status == "DONE") image = "ion-ios-checkmark";
			else if(status == "PAUSE") image = "ion-ios-pause";
			else if(status == "CANCEL") image = "ion-ios-close-outline";
	    	return image;
		}
		$scope.getColor = function(status) {
			var color;
			if(status == "PEND") color = "#AAAAAA";
			else if(status == "DONE") color = "#4F8EF7";
			else if(status == "PAUSE") color = "#AAAAAA";
			else if(status == "CANCEL")color = "#F82A2A";
	    	return color;
		}		
    }
  ]
);