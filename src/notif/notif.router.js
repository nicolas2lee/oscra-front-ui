'use strict';


angular.module('oscra-ui.notif').config(function($stateProvider) {

    $stateProvider
        .state('root.notifall', {
            url: '/notif/index',
            template: require('./list/list.html'),
            controller: require('./list/list'),
            controllerAs: 'notifList'
        })
});
