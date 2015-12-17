angular.module('starter')
.controller('IncomingController',
  [ '$scope',
  	'$rootScope',
  	'IncomingRequest',
    function($scope, $rootScope, IncomingRequest) {
    	$scope.filterUnits = [
	    	{"value":"HOUR","label":"Last hour"},
	    	{"value":"DAY","label":"Last day"},
	    	{"value":"MONTH","label":"Last month"},
	    	{"value":"YEAR","label":"Last year"},
	    	{"value":"ALL","label":"All"}
    	];
    	$scope.selectedItem = {"value":"DAY","label":"Last day"};
        $scope.updateIncomingRequestList = function() {
        	console.log($scope.selectedItem.value);
	    	IncomingRequest.get($scope.selectedItem.value).then(	    		
	    		function(result) {
	                if (result.responseCode == 'OK') {
	                	$scope.items = result.response;
	                } else {
	                	$rootScope.notify(result.responseCode, "Este es un error raro..");		
	                }
	        	}
	        );		   
		}
    	$scope.updateIncomingRequestList();		
		$scope.isSelected = function(item) {
			if(item.value == $scope.selectedItem.value) return true;
			else return false;
		}
		$scope.getImage = function(status) {
			var image;
			if(status == "PEND") image = "ion-ios-circle-outline";
			else if(status == "DONE") image = "ion-ios-checkmark";
			else if(status == "PAUSE") image = "ion-ios-pause";
			else if(status == "CANCEL") image = "ion-ios-close";
	    	return image;
		}
		$scope.getColor = function(status) {
			var color;
			if(status == "PEND") color = "#555555";
			else if(status == "DONE") color = "#4F8EF7";
			else if(status == "PAUSE") color = "#555555";
			else if(status == "CANCEL")color = "#F82A2A";
	    	return color;
		}		
    }
  ]
);