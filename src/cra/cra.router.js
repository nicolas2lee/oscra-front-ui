'use strict';

angular.module('oscra-ui.cra').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('root.cralist', {
            url: '/cra/list',
            template: require('./list/list.html'),
            controller: require('./list/list'),
            controllerAs: 'craList'
        })

        .state('root.cramodify', {
            url: '/cra/modify/:craId',
            template: require('./modify/modify.html'),
            controller: require('./modify/modify'),
            controllerAs: 'craModify'
        })
        .state('root.cracreate', {
            url: '/cra/create',
            template: require('./create/create.html'),
            controller: require('./create/create'),
            controllerAs: 'craCreate'
        })
});


