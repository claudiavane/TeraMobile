angular.module('starter')

.factory('utilConstants', function() {

    var status = [{
        id: 'A',
        name: 'Active'
      }, {
        id: 'D',
        name: 'Delete'
      }];

    var languages = [{
        id: 'es',
        name: 'Spanish'
      }, {
        id: 'en',
        name: 'English'
      }];

    return {
        getStatusActive: function(){
            return status.id = 'A';
       },
        getLanguages: function(){
            return languages;
       }
    };
    
})

.factory('utilMessages', function($rootScope, $ionicPopup, $ionicLoading) {

    $rootScope.notify = function (title, text) {
        var alertPopup = $ionicPopup.alert({
            title: title ? title : 'Error',
            template: text,
            okType: 'button-assertive'
        });
    };

    $rootScope.info = function (title, text) {
        var alertPopup = $ionicPopup.show({
            title: title ? title : '',
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