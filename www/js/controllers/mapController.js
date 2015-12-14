angular.module('starter')

.controller("DeploymentInfoController", function($scope, $stateParams, Keeper) {
    console.log("DeploymentInfoController...");
    $scope.keeperInfo = Keeper.getKeeper($stateParams.id);

    console.log("keeper " + $scope.keeperInfo.DATABASE_SCHEMA);
})


.controller('MapController',
  [ '$scope',
    '$rootScope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    'Keeper',
    'Cellsite',
    'leafletData',
    'Priority',
    'MessageType',
    'AlertMessage',
    'Operator',
    'utilMessages',
    'utilConstants',
    function(
      $scope,
      $rootScope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      Keeper,
      Cellsite,
      leafletData,
      Priority,
      MessageType,
      AlertMessage,
      Operator,
      utilMessages,
      utilConstants
      ) {

      /**
       * Once state loaded, get put map on scope.
       */
      $scope.$on("$stateChangeSuccess", function() {
        var drawnItems;
        var zoom;
        var layerCircle;
        
        $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 14,
            zoomControlPosition: 'bottomleft'
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          },
          controls: {
              draw: {}
          }
        };
        $scope.goLoadMap();
      });

      $scope.goLoadMap = function() {
        var j=0;
        drawnItems = new L.FeatureGroup();
        
        $scope.map.center = {
            lat : 0.0,
            lng : 0.0,
            zoom : 2
        };
        
        $scope.map.controls = {
            type: 'layers',
            draw: {
                position : 'topleft',
                polygon : false,
                polyline : false,
                rectangle : false,
                circle : {
                    drawError : {
                        color : '#b00b00',
                        timeout : 1000
                    },
                    shapeOptions : {
                        color : 'red'
                    }, 
                    stroke: false,                   
                    showArea : true
                },
                marker : false
              },
            edit: {
              featureGroup: drawnItems,
              edit: false,
              remove: false
            }
        };
              
        $scope.map.layers = {
            baselayers: {
                openStreetMap: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            },
            overlays: {
                MOVISTAR: {                    
                  type: 'group',
                  name: 'MOVISTAR',
                  visible: false 
                },
                CLARO: {                    
                  type: 'group',
                  name: 'CLARO',
                  visible: false 
                },
                INIT: {                    
                  type: 'group',
                  name: 'DEPLOYMENT',
                  visible: true 
                },
                draw: {
                    name: 'draw',
                    type: 'group',
                    visible: true,
                    layerParams: {
                        showOnSelector: false
                    }
                }
            }
        };

        Keeper.all().then(function(result){
            utilMessages.validityResponse(result);
            var keepers = result.response;
            
            var isWorking = 'is Working';
            var isNotWorking = 'is not Working';
            if(keepers){
                for (var i = 0; i < keepers.length; i++) {
                    var statusAppServer='';
                    var statusDBServer='';
                    var statusScreenServer='';
                    var statusExtraAppServer='';
                    var statusExtraDBServer='';
                    var statusExtraScreenServer='';

                    if (keepers[i].APPSERVER_WORKING === 0) {
                      statusAppServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Application server </span>​<i class="icon ion-ios-close-outline" style="color: #FF0000;"></i></p>';
                    }else{
                      statusAppServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Application server: </span>​<i class="icon ion-ios-checkmark" style="color: #228B22;"></i></p>';
                    };
                    if (keepers[i].DATABASE_WORKING === 0) {
                      statusDBServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Database server: </span>​<i class="icon ion-ios-close-outline" style="color: #FF0000;"></i></p>';
                    }else{
                      statusDBServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Database server: </span>​<i class="icon ion-ios-checkmark" style="color: #228B22;"></i></p>';
                    };
                    if (keepers[i].SCREEN_WORKING === 0) {
                      statusScreenServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Screen server: </span>​<i class="icon ion-close-circled" style="color: #FF0000;"></i></p>';
                    }else{
                      statusScreenServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Screen server: </span>​<i class="icon ion-ios-checkmark" style="color: #228B22;"></i></p>';
                    };

                    if (keepers[i].EXTRA_TELCO_APPSERVER_WORKING){
                      if (keepers[i].EXTRA_TELCO_APPSERVER_WORKING === 0) {
                        statusExtraAppServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Application Extra server: </span>​<i class="icon ion-close-circled" style="color: #FF0000;"></i></p>';
                      }else{
                        statusExtraAppServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Application Extra server: </span>​<i class="icon ion-ios-checkmark" style="color: #228B22;"></i></p>';
                      };  
                    }

                    if (keepers[i].EXTRA_TELCO_DATABASE_WORKING) {
                      if (keepers[i].EXTRA_TELCO_DATABASE_WORKING === 0) {
                        statusExtraDBServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Database Extra server: </span>​<i class="icon ion-ios-close-outline" style="color: #FF0000;"></i></p>';
                      }else{
                         statusExtraDBServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Database Extra server: </span>​<i class="icon ion-ios-checkmark" style="color: #228B22;"></i></p>';
                      };  
                    }

                    if (keepers[i].EXTRA_TELCO_SCREEN_WORKING) {
                      if (keepers[i].EXTRA_TELCO_SCREEN_WORKING === 0) {
                        statusExtraScreenServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Screen Extra server: </span>​<i class="icon ion-ios-close-outline" style="color: #FF0000;"></i></p>';
                      }else{
                        statusExtraScreenServer = '<p style="font-size: 14px;"><span class="left" style="padding-right:5px;">Screen Extra server: </span>​<i class="icon ion-ios-checkmark" style="color: #228B22;"></i></p>';
                      };
                    }

                    var queuedMessage = '<p style="font-size: 14px;><span class="left">Queued Messages: </span>​<span style="float:right;" class="badge badge-dark">'+ keepers[i].QUANTITY_SUBSCRIBER_QUEUED + '</span></p>';
                    
                    var message = '<div id="content">' +
                        '<h4 id="firstHeading" style="color: #4682B4;">'+ keepers[i].DESCRIPTION +'</h4>'+
                        '<div id="bodyContent">'+ 
                        statusAppServer +
                        statusDBServer +
                        statusScreenServer +
                        statusExtraAppServer +
                        statusExtraDBServer +
                        statusExtraScreenServer +
                        queuedMessage +
                        '<a href="#/app/deploymentInformation/'+ keepers[i].ID +'">'+
                        'More detail' +
                        '</a>'+                                                  
                        '</div>'+
                        '</div>'
                        ;

                    $scope.map.markers[j] = {
                        layer: 'INIT',
                        lat: keepers[i].LATITUDE,
                        lng: keepers[i].LONGITUDE,
                        message: message,
                        focus: false,
                        draggable: false
                    };
                    j++;
                }
            };          
        });
   
        $scope.$watch('map.center.zoom', function(newValue){
            $scope.map.layers.overlays.CLARO.visible = newValue >= 5;
            $scope.map.layers.overlays.MOVISTAR.visible = newValue >= 5;
            $scope.map.layers.overlays.INIT.visible = true;
            zoom = newValue;

            $scope.loadCellsite();
        });

        $scope.loadCellsite = function() {
            
            Cellsite.getCellsites(utilConstants.getStatusActive(), zoom, $rootScope.user.user_id).then(function(result){
                utilMessages.validityResponse(result);
                var cellsites = result.response;
                if (cellsites) {
                    for (var i = 0; i < cellsites.length; i++) {

                        var lat = parseFloat(cellsites[i].latitude);
                        var lng = parseFloat(cellsites[i].longitude);
              
                        var message = '<div id="content">' +
                            '<h4 id="firstHeading" >'+ cellsites[i].name +'</h4>'+
                            '<div id="bodyContent">'+                               
                            '</div>'+
                            '</div>';

                        var iconMarker = [];
                        if (cellsites[i].operatorId === 1) {
                          iconMarker[i] = {
                            iconUrl: 'img/movistar.png',
                            iconSize: [25, 38]
                          };
                          layerMarker = cellsites[i].operatorName;                
                        }

                        if(cellsites[i].operatorId === 2){
                          iconMarker[i] = {
                            iconUrl: 'img/claro.png',
                            iconSize: [25, 38]
                          };
                          layerMarker = cellsites[i].operatorName;                  
                        }

                        $scope.map.markers[j] = {
                            layer: cellsites[i].operatorName,
                            lat: lat,
                            lng: lng,
                            message: message,
                            focus: false,
                            draggable: false,
                            icon: iconMarker[i]
                        };
                        j++;
                    }
                };        
            });
        };     
    };

    leafletData.getMap().then(function(map) {
        leafletData.getLayers().then(function(baselayers) {
            drawnItems = baselayers.overlays.draw;
            map.on('draw:created', function (e) {
              layerCircle = e.layer;
              drawnItems.addLayer(layerCircle);
              
              $scope.openModal();
            });
        });
    }); 

    $ionicModal.fromTemplateUrl('templates/sendMessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
    });

    $scope.messageTypes = MessageType.all();
    $scope.priorities = Priority.all();
    $scope.messageType = MessageType.get(0); // default
    $scope.priority = Priority.get(2);
    $scope.operators = [];
    Operator.all().then(function(result){
      utilMessages.validityResponse(result);
      var ops = result.response;
      for (var i = 0; i < ops.length; i++) {
        var item = ops[i];
        $scope.operators.push({"id": item.id, "name": item.name, "checked": true});
      };      
    });

    $scope.datepickerObject = {
      titleLabel: 'Date Message Send',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Save',  //Optional
      setButtonType : 'button-small button-energized',  //Optional
      todayButtonType : 'button-small button-dark',  //Optional
      closeButtonType : 'button-small button-stable',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      //disabledDates: disabledDates, //Optional
      //weekDaysList: weekDaysList, //Optional
      //monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-dark', //Optional
      modalFooterColor: 'bar-dark', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };
    $scope.datePicker = new Date();
    var datePickerCallback = function (val) {
      if (typeof(val) !== 'undefined') {
        console.log('Selected date is : ', val);
        $scope.datePicker = val;
      }
    };
    
    $scope.openModal = function() {
      $scope.circleMessage = new CircleMessage();      
      $scope.modal.show();
    }
    $scope.closeModal = function() {
      if (layerCircle) {
        drawnItems.removeLayer(layerCircle);
      };
      $scope.modal.hide();
    }
    $scope.isSelectedPriority = function(item) {
      if(item.id == $scope.priority.id) return true;
      else return false;
    }
    $scope.isSelectedMessageType = function(item) {
      if(item.id == $scope.messageType.id) return true;
      else return false;
    }
    var CircleMessage = function() {
        if ( !(this instanceof CircleMessage) ) return new CircleMessage();
        this.message = "";
        this.lat  = "";
        this.lng  = "";
        this.ratio = "";
        this.deliveryDatetime = "";
        this.userId = "";
        this.subdivisionId = "";
        this.operatorsId = [];
        this.orgId = "";
        this.messageType;
        this.zoom = "";
    };

    $scope.respPreview;
    $scope.smsPreview = function() {
        $rootScope.show('Preview...');
        
        $scope.circleMessage.userId = $rootScope.user.user_id;
        $scope.circleMessage.subdivisionId = $rootScope.subdivision.id;
        $scope.circleMessage.orgId = $rootScope.user.org_id;
        $scope.circleMessage.lat = layerCircle.getLatLng().lat;
        $scope.circleMessage.lng = layerCircle.getLatLng().lng;  
        $scope.circleMessage.ratio = layerCircle.getRadius()/1000; 
        $scope.circleMessage.zoom = zoom;
        $scope.circleMessage.messageType = $scope.messageType.id;
        $scope.circleMessage.priority = $scope.priority.id;

        var dateString = $scope.datePicker.getFullYear()+
                      ($scope.datePicker.getMonth()+1).toString()+
                      $scope.datePicker.getDate().toString()+
                      $scope.datePicker.getHours().toString()+
                      $scope.datePicker.getMinutes().toString()+
                      $scope.datePicker.getSeconds().toString();

        $scope.dateToString = $scope.datePicker.getFullYear()+ '-'+
                             ($scope.datePicker.getMonth()+1).toString() +'-'+
                             $scope.datePicker.getDate().toString() +' '+
                             $scope.datePicker.getHours().toString() +':'+
                             $scope.datePicker.getMinutes().toString() +':'+
                             $scope.datePicker.getSeconds().toString();

        $scope.circleMessage.deliveryDatetime = dateString;
        $scope.circleMessage.operatorsId = [];
        for (var i = 0; i < $scope.operators.length; i++) {
          if ($scope.operators[i].checked) {
            $scope.circleMessage.operatorsId.push($scope.operators[i].id);
          }
        };

        AlertMessage.previewSmsCircle($scope.circleMessage).then(function(result){
          utilMessages.validityResponse(result);
          $scope.respPreview = result.response;

          $rootScope.hide();
          //$scope.closeModal();
          $scope.openModalSendSms();
        });           
    }

    $ionicModal.fromTemplateUrl('templates/confirmSendMessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalConfirm = modal;
    });
    $scope.openModalSendSms = function() {

      $scope.modalConfirm.show();
    }
    $scope.closeModalSendSms = function() {
      if (layerCircle) {
        drawnItems.removeLayer(layerCircle);
      };
      $scope.modalConfirm.hide();
    }
    $scope.smsSend = function() {
        $rootScope.show('Sending...');
        AlertMessage.sendSmsCircle($scope.circleMessage).then(function(result){
          utilMessages.validityResponse(result);
          
          $rootScope.hide();
          $scope.closeModalSendSms();
          if (result.responseCode === 'OK') {
            $rootScope.notify("Success", "The send request was done");  
          };          
        });
    };

}]);