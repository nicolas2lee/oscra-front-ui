
angular.module('oscra-ui.setting.activitytype').factory('ActivityTypeService', service);

function service(API){

    var ACTIVITYTYPES = 'activitytypes/';

    function list(callBack) {
        API.get(ACTIVITYTYPES+'all', null, callBack);
    }

    function listCategoryAbsence(category, callBack){
        API.get(ACTIVITYTYPES+'/absence/all?category='+category, null, callBack);
    }

    return {
        list : list,
        listCategoryAbsence: listCategoryAbsence
    }
}