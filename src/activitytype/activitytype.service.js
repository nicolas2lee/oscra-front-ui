
angular.module('oscra-ui.activitytype').factory('ActivityTypeService', service);

function service(API){

    var ACTIVITYTYPES = 'activitytypes/';

    function list(callBack) {
        API.get(ACTIVITYTYPES+'all', null, callBack);
    }

    return {
        list : list
    }
}