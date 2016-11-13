
angular.module('oscra-ui.setting.activitytype').factory('ActivityTypeService', service);

function service(API){

    var ACTIVITYTYPES = 'activitytypes/';

    function list(callBack) {
        API.get(ACTIVITYTYPES+'all', null, callBack);
    }

    function create(activityType, callBack) {
        API.post(ACTIVITYTYPES+'add', activityType, callBack);
    }

    function remove(activityTypeId, callBack) {
        API.post(ACTIVITYTYPES+'delete?activityTypeId='+activityTypeId, null, callBack);
    }

    function modify(activityType, callBack) {
        API.post(ACTIVITYTYPES+'update', activityType, callBack);
    }


    /*
    function findById(userId, callBack) {
        API.get(ACTIVITYTYPES+'findById?userId='+userId, null, callBack);
    }
*/

    return {
        list : list,
        create : create,
        delete : remove,
        modify : modify
        /*
        findById : findById*/
    }
}