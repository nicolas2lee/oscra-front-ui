'use strict';
angular.module('oscra-ui.table')
    .filter('startFrom',function (){
    return function (input,start) {
        start = +start;
        return input.slice(start);
    }
})