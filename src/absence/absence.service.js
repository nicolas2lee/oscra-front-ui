
angular.module('oscra-ui.absence').factory('AbsenceService', service);

function service(API){

    var ABSENCES = 'absences/';

    function fakelist(dstPage, callBack) {
        API.get(ABSENCES+'fakeall?dstPage='+dstPage, null, callBack);
    }

    function list(callBack) {
        API.get(ABSENCES+'all', null, callBack);
    }

    function create(absence, providerId, validatorId, lastModifyUserId, callBack) {
        API.post(ABSENCES+'add?providerId='+providerId+'&validatorId='+validatorId+'&lastModifyUserId='+lastModifyUserId, absence, callBack);
    }

    function modify(absence, providerId, validatorId, lastModifyUserId, callBack) {
        API.post(ABSENCES+'update?providerId='+providerId+'&validatorId='+validatorId+'&lastModifyUserId='+lastModifyUserId, absence, callBack);
    }

    function remove(absenceId, callBack) {
        API.post(ABSENCES+'delete?absenceId='+absenceId, null, callBack);
    }

    function findById(absenceId, callBack) {
        API.get(ABSENCES+'findById?absenceId='+absenceId, null, callBack);
    }


    return {
        fakelist : fakelist,
        list : list,
        create : create,
        modify : modify,
        delete : remove,
        findById : findById
    }
}