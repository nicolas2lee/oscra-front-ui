'use strict';

require('angular');
require('angular-ui-router');

require('angular-animate');
require('angular-aria');
require('angular-material');

require('angular-cookies');

require('./util/api');

var app = angular.module('oscra-ui',
    ['ui.router','ngMaterial', 'ngCookies',
        'oscra-ui.cra',   'oscra-ui.util',    'oscra-ui.activitytype', 'oscra-ui.setting',
        'oscra-ui.table', 'oscra-ui.absence', 'oscra-ui.login',        'oscra-ui.user',    'oscra-ui.notif']);


require('./../assets/css/commonCrudTable.css');
require('./../assets/css/loading.css');
require('./../assets/css/headbar.css');
require('./../node_modules/angular-material/angular-material.css');
require('./../assets/css/headbar.css');

require('./cra/cra.module');
require('./user/user.module');
require('./common/table/table.module');
require('./activitytype/activitytype.module');
require('./absence/absence.module');
require('./login/login.module');
require('./setting/setting.module');
require('./notif/notif.module');

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('blue') // specify primary color, all
    // other color intentions will be inherited
    // from default
})
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('beforelogin', {
                url: '/',
                views:{
                    headbar : {
                        template: require('./layout/headbar/beforelogin.html'),
                        controller: require('./layout/headbar/beforelogin.controller'),
                        controllerAs: 'headbarCtrl'
                    },
                    mainpanel:{
                        template: require('./layout/mainpanel/beforelogin.html'),
                        controller: require('./layout/mainpanel/beforelogin.controller'),
                        controllerAs: 'mainpanelCtrl'
                    },
                    footer:{
                        template: require('./layout/footer/footer.html'),
                        controller: function(){

                        }
                        //controllerAs: 'headbarCtrl'
                    }
                }
            })
            .state('root',{
                url: '/dashboard',
                views:{
                    headbar : {
                        template: require('./layout/headbar/afterlogin.html'),
                        controller: require('./layout/headbar/afterlogin.controller'),
                        controllerAs: 'headbarCtrl'
                    },
                    mainpanel:{
                        template: require('./layout/mainpanel/afterlogin.html'),
                        controller: require('./layout/mainpanel/afterlogin.controller'),
                        controllerAs: 'mainpanelCtrl'
                    },
                    footer:{
                        template: require('./layout/footer/footer.html'),
                        controller: function(){

                        }
                        //controllerAs: 'headbarCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise('/');
    });




