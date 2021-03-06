angular.module('starter')


.controller('MapController',
  [ '$scope',
    '$rootScope',
    '$state',
    '$ionicHistory',
    '$ionicModal',
    '$ionicPopup',
    '$translate',
    '$filter',
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
      $state,
      $ionicHistory,
      $ionicModal,
      $ionicPopup,
      $translate,
      $filter,
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
    console.log("MapController...");

    //$scope.$on("$stateChangeSuccess", function() {
    $scope.$on('$ionicView.enter', function(){

        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();

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
                }/*,
                draw: {
                    name: 'draw',
                    type: 'group',
                    visible: true,
                    layerParams: {
                        showOnSelector: false
                    }
                }*/
            }
        };

        Keeper.all().then(function(result){
            utilMessages.validityResponse(result);
            var keepers = result.response;
            
            if(keepers){
                for (var i = 0; i < keepers.length; i++) {
                    var statusAppServer='';
                    var statusDBServer='';
                    //var statusScreenServer='';
                    var statusExtraAppServer='';
                    var statusExtraDBServer='';
                    //var statusExtraScreenServer='';
                    var singleDeploy='';
                    var ngoDeploy = '<div class="item item-divider" style="font-size:12px; background:#eaeaea; padding:3px;">'+keepers[i].NAME+'</div>';
                    var appServerNOk = '<div class="item item-icon-right"  style="padding:2px;">{{"APP_SERVER"| translate}}</span>​<i class="icon ion-ios-close-outline" style="color: #FF0000; font-size: 16px;"></i></div>';
                    var appServerOk = '<div class="item item-icon-right" style="padding:2px;">{{"APP_SERVER"| translate}}</span>​<i class="icon ion-ios-checkmark" style="color: #074d61; font-size: 16px;"></i></div>';
                    var dbServerNOk = '<div class="item item-icon-right" style="padding:2px;">{{"DB_SERVER"| translate}}</span>​<i class="icon ion-ios-close-outline" style="color: #FF0000; font-size: 16px;"></i></div>';
                    var dbServerOk = '<div class="item item-icon-right" style="padding:2px;">{{"DB_SERVER"| translate}}</span>​<i class="icon ion-ios-checkmark" style="color: #074d61; font-size: 16px;"></i></div>';
                    var screenNOk = '<div class="item item-icon-right" style="padding:2px;">{{"SCREEN_SERVER"| translate}}</span>​<i class="icon ion-close-circled" style="color: #FF0000; font-size: 16px;"></i></div>';
                    var screenOk = '<div class="item item-icon-right" style="padding:2px;">{{"SCREEN_SERVER"| translate}}</span>​<i class="icon ion-ios-checkmark" style="color: #074d61; font-size: 16px;"></i></div>';

                    if (keepers[i].APPSERVER_WORKING === 0) statusAppServer = appServerNOk;
                    else statusAppServer = appServerOk;
                    
                    if (keepers[i].DATABASE_WORKING === 0) statusDBServer = dbServerNOk;
                    else statusDBServer = dbServerOk;
                    
                    //if (keepers[i].SCREEN_WORKING === 0) statusScreenServer = screenNOk;
                    //else statusScreenServer = screenOk;
                    
                    if (keepers[i].EXTRA_TELCO_APPSERVER_WORKING){
                      singleDeploy = '<div class="item item-divider" style="font-size:12px; background:#eaeaea; padding:3px;">'+keepers[i].EXTRA_NAME+'</div>';
                      
                      if (keepers[i].EXTRA_TELCO_APPSERVER_WORKING === 0) statusExtraAppServer = appServerNOk;
                      else statusExtraAppServer = appServerOk;
                                 
                      if (keepers[i].EXTRA_TELCO_DATABASE_WORKING) {
                        if (keepers[i].EXTRA_TELCO_DATABASE_WORKING === 0) statusExtraDBServer = dbServerNOk;
                        else statusExtraDBServer = dbServerOk;                        
                      }

                      /*if (keepers[i].EXTRA_TELCO_SCREEN_WORKING) {
                        if (keepers[i].EXTRA_TELCO_SCREEN_WORKING === 0) statusExtraScreenServer = screenNOk;
                        else statusExtraScreenServer = screenOk;                        
                      }*/

                    }

                    var queuedMessage = '<p><span class="left">{{"QUEUED_MESSAGE"| translate}}</span>​<span style="float:right; font-size: 12px;" class="badge badge-dark">'+ keepers[i].QUANTITY_SUBSCRIBER_QUEUED + '</span></p>';
                    
                    var message = '<div id="content" ng-app="starter" ng-controller="MapController">' +
                        '<h4 id="firstHeading" style="color: #9c1320;" ng-click="openModalDeploymentInfo('+keepers[i].ID+')">'+ keepers[i].DESCRIPTION +'</h4>'+
                        '<div id="bodyContent" >'+ 
                        ngoDeploy +
                        statusAppServer +
                        statusDBServer +
                        //statusScreenServer +
                        singleDeploy+
                        statusExtraAppServer +
                        statusExtraDBServer +
                        //statusExtraScreenServer +
                        queuedMessage +
                        //'<button class="button button-small button-balanced icon-right ion-chevron-right" ng-click="openModalDeploymentInfo('+keepers[i].ID+')" >'+
                        //'More detail' +
                        //'</button>'+                                                  
                        '</div>'+
                        '</div>'
                        ;

                    $scope.map.markers[j] = {
                        layer: 'INIT',
                        lat: keepers[i].LATITUDE,
                        lng: keepers[i].LONGITUDE,
                        message: message,
                        focus: false,
                        draggable: false,
                        icon: {
                            iconUrl: 'img/marker32.png',
                            iconSize: [30, 38]
                        }
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

            Cellsite.getCellsites(utilConstants.getStatusActive(), zoom, $scope.user.user_id).then(function(result){
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
                            type: 'div',
                            html: '<i class="ion-ios-location" style="color:#73bf43; font-size:18px;"></i>',
                          };
                          layerMarker = cellsites[i].operatorName;                
                        }

                        if(cellsites[i].operatorId === 2){
                          iconMarker[i] = {
                            type: 'div',
                            html: '<i class="ion-ios-location" style="color:#ff0000; font-size:18px;"></i>',
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
                }else $rootScope.notify($filter('translate')('WARNING'), $filter('translate')('WARNING_CELLSITE'));         
            });
        }
        leafletData.getMap().then(function(map) {
            leafletData.getLayers().then(function(baselayers) {
                //drawnItems = baselayers.overlays.draw;                
                map.on('draw:created', function (e) {
                  layerCircle = e.layer;
                  drawnItems.addLayer(layerCircle); 
                  $scope.openModal();
                });
            });
        });                 
    };

    var loadData = function() {
        $scope.messageTypes = MessageType.all();  
        $scope.priorities = Priority.all();
        $scope.selectMessageType = MessageType.get(0);
        $scope.selectPriority =  Priority.get(2);

        Operator.all().then(function(result){
            utilMessages.validityResponse(result);
            var ops = result.response;
            $scope.operators = [];            
            for (var i = 0; i < ops.length; i++) {
                var item = ops[i];
                $scope.operators.push({"id": item.id, "name": item.name, "checked": true});
            };      
        });
    }
    $scope.openModal = function() {
        $scope.circleMessage = new CircleMessage();
        loadData();
        $scope.modal.show();
    }
    $scope.closeModal = function() {      
        if (layerCircle) {
          drawnItems.removeLayer(layerCircle);            
        };
        $scope.modal.hide();
    }
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    }); 

    $ionicModal.fromTemplateUrl('templates/sendMessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
    });       

    $scope.datePicker;
    /*var datePickerCallback = function (val) {
      if (typeof(val) !== 'undefined') {
        console.log('Selected date is : ', val);
        $scope.datePicker = val;
      }
    }
    $scope.datepickerObject = {
        titleLabel: 'Delivery date',  //Optional
        todayLabel: ' ',  //Optional
        closeLabel: ' ',  //Optional
        setLabel: ' ',  //Optional
        setButtonType : 'button icon ion-checkmark tera-ok',  //Optional
        todayButtonType : 'button icon ion-android-calendar',  //Optional
        closeButtonType : 'button icon ion-close',  //Optional
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
    };*/
    /*
    $scope.isSelectedPriority = function(item) {
        if(item.id === $scope.priority.id) return true;
        else return false;
    }
    $scope.isSelectedMessageType = function(item) {
        console.log("item: " + item.id)
        if(item.id === $scope.messageType.id) return true;
        else return false;        
    } */   
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
    $scope.changeMessageType = function (messageType) {
        $scope.selectMessageType = messageType;
    };
    $scope.changePriority = function (priority) {
        $scope.selectPriority = priority;
    };
    $scope.respPreview;
    $scope.currentDate = new Date();
    $scope.smsPreview = function() {
        var txtPreview = $filter('translate')('PREVIEWING');//$translate('PREVIEWING');
        $rootScope.show(txtPreview);
        
        $scope.circleMessage.userId = $scope.user.user_id;
        $scope.circleMessage.subdivisionId = 1;
        $scope.circleMessage.orgId = $scope.user.org_id;
        $scope.circleMessage.lat = layerCircle.getLatLng().lat;
        $scope.circleMessage.lng = layerCircle.getLatLng().lng;  
        $scope.circleMessage.ratio = layerCircle.getRadius()/1000; 
        $scope.circleMessage.zoom = zoom;
        $scope.circleMessage.messageType = $scope.selectMessageType.id;
        $scope.circleMessage.priority = $scope.selectPriority.id;

        if (!$scope.datePicker) {
          $scope.datePicker = $scope.currentDate;
        }

        Date.prototype.getSecondsTwoDigits = function(){
            var retval = this.getSeconds();
            if (retval < 10){
                return ("0" + retval.toString());
            }
            else{
                return retval.toString();
            }
        }
        Date.prototype.getMinutesTwoDigits = function(){
            var retval = this.getMinutes();
            if (retval < 10){
                return ("0" + retval.toString());
            }
            else{
                return retval.toString();
            }
        }
        Date.prototype.getHoursTwoDigits = function(){
            var retval = this.getHours();
            if (retval < 10){
                return ("0" + retval.toString());
            }
            else{
                return retval.toString();
            }
        }
        Date.prototype.getDateTwoDigits = function(){
            var retval = this.getDate();
            if (retval < 10){
                return ("0" + retval.toString());
            }
            else{
                return retval.toString();
            }
        }        
        Date.prototype.getMonthTwoDigits = function(){
            var retval = this.getMonth()+1;
            if (retval < 10){
                return ("0" + retval.toString());
            }
            else{
                return retval.toString();
            }
        }
        
        var dateString = $scope.datePicker.getFullYear()+
                      $scope.datePicker.getMonthTwoDigits()+
                      $scope.datePicker.getDateTwoDigits()+
                      $scope.datePicker.getHoursTwoDigits()+
                      $scope.datePicker.getMinutesTwoDigits()+
                      $scope.datePicker.getSecondsTwoDigits();
        
        $scope.dateToString = $scope.datePicker.getFullYear()+ '-'+
                             $scope.datePicker.getMonthTwoDigits() +'-'+
                             $scope.datePicker.getDate().toString() +' '+
                             $scope.datePicker.getHoursTwoDigits() +':'+
                             $scope.datePicker.getMinutesTwoDigits() +':'+
                             $scope.datePicker.getSecondsTwoDigits();
        
        $scope.circleMessage.deliveryDatetime = dateString;
        $scope.circleMessage.operatorsId = [];
        for (var i = 0; i < $scope.operators.length; i++) {
          if ($scope.operators[i].checked) {
            $scope.circleMessage.operatorsId.push($scope.operators[i].id);
          }
        };

        AlertMessage.previewSmsCircle($scope.circleMessage).then(function(result){
          utilMessages.validityResponse(result);

          if (result.responseCode === 'OK') {  
              $scope.respPreview = result.response;
              $scope.openModalSendSms();
          }                   
          $rootScope.hide();
        });           
    }
    
    $ionicModal.fromTemplateUrl('templates/confirmSendMessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalConfirm = modal;
    });
    $scope.openModalSendSms = function() {
      $scope.datePicker = null;      
      $scope.selectMessageType = MessageType.get($scope.selectMessageType.id);
      $scope.selectPriority = Priority.get($scope.selectPriority.id);

      $scope.modalConfirm.show();
    }
    $scope.closeModalSendSms = function() {
      if (layerCircle) {
        drawnItems.removeLayer(layerCircle);
      };
      $scope.modalConfirm.hide();
    }
    $scope.smsSend = function() {
        $rootScope.hide();
        var isError= true;
        var titleInfo;
        var msgInfo;
        var txtSend;
        
        if($scope.respPreview){
            for (var i = 0; i < $scope.respPreview.length; i++) {
              if ($scope.respPreview[i].quantity > 0) {
                isError = false;
                break;
              }
            }
            if(isError) {
                titleInfo = $filter('translate')('WARNING');
                msgInfo = $filter('translate')('MSG_QTTY_VALIDITY');
                $rootScope.notify(titleInfo, msgInfo);                
            }else{
                txtSend = $filter('translate')('SENDING');
                $rootScope.show(txtSend);
                AlertMessage.sendSmsCircle($scope.circleMessage).then(function(result){
                  //utilMessages.validityResponse(result);
                  titleInfo = $filter('translate')('SUCCESS');
                  msgInfo = $filter('translate')('SUCCESS_SEND');
                  if (result.responseCode === 'OK') $rootScope.info(titleInfo, msgInfo);  
                  else $rootScope.notify(result.responseCode, result.responseMessage);

                  $rootScope.hide();          
                  $scope.closeModalSendSms();
                });
            }
        }
    }
    $ionicModal.fromTemplateUrl('templates/deploymentInformation.html', {
        scope: $scope,
        animation: 'slide-in-left'
        }).then(function(modal) {
            $scope.modalDeploymentinfo = modal;
    });
    $scope.openModalDeploymentInfo = function(delpoyItemId) {      
      $scope.keeperInfo = Keeper.getKeeper(delpoyItemId);      
      Keeper.getDisk(delpoyItemId).then(function(result){
        $scope.disk = result.response;
      });
      Keeper.getMemory(delpoyItemId).then(function(result){
        $scope.memory = result.response;
      });
      $scope.modalDeploymentinfo.show();
    }
    $scope.closeModalDeploymentInfo = function() {
      $scope.modalDeploymentinfo.hide();
    }
    $scope.$on('$destroy', function() {
      $scope.modalDeploymentinfo.remove();
    });
    $scope.reloadAll = function(){
      console.log("reload all");
      $state.go('app.mainMap', {}, {reload: true}); 
      /*$state.go($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify:true
      });*/
    }

}]);