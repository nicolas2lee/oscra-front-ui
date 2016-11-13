'use strict';


angular.module('oscra-ui.cra')
    .filter('dateFormat', function ($filter) {
    return function (input) {
        if (input == null){return '';}
        var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
        return _date.toUpperCase();

    }
})
    .filter('getDayOnly', function ($filter) {
        return function (input) {
            if (input == null){return '';}
            var _date = $filter('date')(new Date(input), 'dd');
            return _date;

        }
    });