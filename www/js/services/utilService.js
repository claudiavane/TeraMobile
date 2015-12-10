angular.module('starter')

.factory('utilConstants', function() {

    var status = [{
        id: 'A',
        name: 'Active'
      }, {
        id: 'D',
        name: 'Delete'
      }];

    return {
        getStatusActive: function(){
            return status.id = 'A';
       }
    };
    
})

.factory('utilMessages', function($rootScope, $ionicPopup, $ionicLoading) {

    $rootScope.notify = function (title, text) {
        var alertPopup = $ionicPopup.alert({
            title: title ? title : 'Error',
            template: text
        });
    };

    $rootScope.show = function (text) {
        $rootScope.loading = $ionicLoading.show({
            template: '<i class="icon ion-looping"></i><br>' + text,
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    };

    $rootScope.hide = function (text) {
        $ionicLoading.hide();
    };

    return {
        validityResponse: function(result){
            if (result.responseCode !== 'OK'){
                $rootScope.notify(result.responseCode, result.responseMessage);
            }
       }};
    
});