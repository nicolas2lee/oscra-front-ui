
angular.module('oscra-ui.absence').factory('AbsenceService', service);

function service(API){

    var ABSENCES = 'absences/';

    function mylist(dstPage, providerId, callBack){
        API.get(ABSENCES+'user/fakeall?dstPage='+dstPage+'&providerId='+providerId, null, callBack);
    }

    function listCategoryAbsence(category, callBack){
        API.get(ACTIVITYTYPES+'/absence/all?category='+category, null, callBack);
    }

    function create(absence, absenceTypeId, providerId, validatorId, lastModifyUserId, callBack) {
        API.post(ABSENCES+'add?providerId='+providerId+'&absenceTypeId='+absenceTypeId+'&validatorId='+validatorId+'&lastModifyUserId='+lastModifyUserId, absence, callBack);
    }

    function modify(absence, absenceTypeId, providerId, validatorId, lastModifyUserId, callBack) {
        API.post(ABSENCES+'update?providerId='+providerId+'&absenceTypeId='+absenceTypeId+'&validatorId='+validatorId+'&lastModifyUserId='+lastModifyUserId, absence, callBack);
    }

    function remove(absenceId, callBack) {
        API.post(ABSENCES+'delete?absenceId='+absenceId, null, callBack);
    }

    function findById(absenceId, callBack) {
        API.get(ABSENCES+'findById?absenceId='+absenceId, null, callBack);
    }


    return {
        mylist : mylist,
        listCategoryAbsence: listCategoryAbsence,
        create : create,
        modify : modify,
        delete : remove,
        findById : findById
    }
}