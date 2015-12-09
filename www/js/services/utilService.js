angular.module('starter')

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

    return {};
    
});