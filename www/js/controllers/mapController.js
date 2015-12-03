angular.module('starter')

.controller("ControlsDrawController", [ "$scope", "leafletData", function($scope, leafletData) {
      /*angular.extend($scope, {
          london: {
              lat: 51.505,
              lng: -0.09,
              zoom: 4
          },
          controls: {
              draw: {}
          },
          layers: {
              baselayers: {
                  mapbox_light: {
                      name: 'Mapbox Light',
                      url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                      type: 'xyz',
                      layerOptions: {
                          apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                          mapid: 'bufanuvols.lia22g09'
                      },
                      layerParams: {
                          showOnSelector: false
                      }
                  }
              },
              overlays: {
                  draw: {
                      name: 'draw',
                      type: 'group',
                      visible: true,
                      layerParams: {
                          showOnSelector: false
                      }
                  }
              }
          }
     });

     leafletData.getMap().then(function(map) {
         leafletData.getLayers().then(function(baselayers) {
            var drawnItems = baselayers.overlays.draw;
            map.on('draw:created', function (e) {
              var layer = e.layer;
              drawnItems.addLayer(layer);
              console.log(JSON.stringify(layer.toGeoJSON()));
            });
         });
     });*/
 }])

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
       console.log("$rootScope.user "+ $rootScope.user.userId);

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

        Keeper.getKeepers().then(function(result){
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
                      statusAppServer = '<p>App server: '+ isNotWorking + '</p>';
                    }else{
                      statusAppServer = '<p>App server: '+ isWorking + '</p>';
                    };
                    if (keepers[i].DATABASE_WORKING === 0) {
                      statusDBServer = '<p>DB server: '+ isNotWorking + '</p>';
                    }else{
                      statusDBServer = '<p>DB server: '+ isWorking + '</p>';
                    };
                    if (keepers[i].SCREEN_WORKING === 0) {
                      statusScreenServer = '<p>Screen server: '+ isNotWorking + '</p>';
                    }else{
                      statusScreenServer = '<p>Screen server: '+ isWorking + '</p>';
                    };

                    if (keepers[i].EXTRA_TELCO_APPSERVER_WORKING){
                      if (keepers[i].EXTRA_TELCO_APPSERVER_WORKING === 0) {
                        statusExtraAppServer = '<p>App Extra server: '+ isNotWorking + '</p>';
                      }else{
                        statusExtraAppServer = '<p>App Extra server: '+ isWorking + '</p>';
                      };  
                    }

                    if (keepers[i].EXTRA_TELCO_DATABASE_WORKING) {
                      if (keepers[i].EXTRA_TELCO_DATABASE_WORKING === 0) {
                        statusExtraDBServer = '<p>DB Extra server: '+ isNotWorking + '</p>';
                      }else{
                         statusExtraDBServer = '<p>DB Extra server: '+ isWorking + '</p>';
                      };  
                    }

                    if (keepers[i].EXTRA_TELCO_SCREEN_WORKING) {
                      if (keepers[i].EXTRA_TELCO_SCREEN_WORKING === 0) {
                        statusExtraScreenServer = '<p>Screen Extra server: '+ isNotWorking + '</p>';
                      }else{
                        statusExtraScreenServer = '<p>Screen Extra server: '+ isWorking + '</p>';
                      };
                    }

                    var queuedMessage = '<p>Queued Messages: '+ keepers[i].QUANTITY_SUBSCRIBER_QUEUED + '</p>';
                    
                    var message = '<div id="content">' +
                        '<h4 id="firstHeading" >'+ keepers[i].DESCRIPTION +'</h4>'+
                        '<div id="bodyContent">'+ 
                        statusAppServer +
                        statusDBServer +
                        statusScreenServer +
                        statusExtraAppServer +
                        statusExtraDBServer +
                        statusExtraScreenServer +
                        queuedMessage +                                                  
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
            var userId = 12;

            Cellsite.getCellsites(utilConstants.getStatusActive(), zoom, userId).then(function(result){
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

        $scope.circleMessage.userId = 12;
        $scope.circleMessage.subdivisionId = $rootScope.subdivision.id;
        $scope.circleMessage.orgId = 1;
        $scope.circleMessage.lat = layerCircle.getLatLng().lat;
        $scope.circleMessage.lng = layerCircle.getLatLng().lng;  
        $scope.circleMessage.ratio = layerCircle.getRadius(); 
        $scope.circleMessage.zoom = zoom;
        $scope.circleMessage.messageType.id = $scope.messageType.id;
        $scope.circleMessage.priority.id = $scope.priority.id;

        for (var i = 0; i < $scope.operators.length; i++) {
          if ($scope.operators[i].checked) {
            $scope.circleMessage.operatorsId.push($scope.operators[i].id);
          }
        };
        
        AlertMessage.previewSmsCircle($scope.circleMessage).then(function(result){
          utilMessages.validityResponse(result);
          $scope.respPreview = result.response;

          $rootScope.hide();
          $scope.closeModal();
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