'use strict';


angular.module('oscra-ui.setting.activitytype').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('root.activitytypeall', {
            url: '/setting/activitytype/list',
            template: require('./list/list.html'),
            controller: require('./list/list'),
            controllerAs: 'activitytypeList'
        })

});
