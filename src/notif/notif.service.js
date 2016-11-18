
angular.module('oscra-ui.notif')
    .factory('CraNotifService', craNotifService)
    .factory('AbsenceNotifService', absenceNotifService);

function craNotifService(API){

    var CRANOTIFS = 'cranotifs/';

    function sentCraFakeList(dstPage, crafromId, callBack) {
        API.get(CRANOTIFS+'sent/fakeall?dstPage='+dstPage+'&crafromId='+crafromId, null, callBack);
    }

    function receivedCraFakeList(dstPage, cratoId, callBack) {
        API.get(CRANOTIFS+'received/fakeall?dstPage='+dstPage+'&cratoId='+cratoId, null, callBack);
    }

    return {
        sentCraFakeList : sentCraFakeList,
        receivedCraFakeList : receivedCraFakeList
    }
}

function absenceNotifService(API){

    var ABSENCENOTIFS = 'absencenotifs/';

    function sentAbsenceFakeList(dstPage, absencefromId, callBack) {
        API.get(ABSENCENOTIFS+'sent/fakeall?dstPage='+dstPage+'&absencefromId='+absencefromId, null, callBack);
    }

    function receivedAbsenceFakeList(dstPage, absencetoId, callBack) {
        API.get(ABSENCENOTIFS+'received/fakeall?dstPage='+dstPage+'&absencetoId='+absencetoId, null, callBack);
    }

    return {
        sentAbsenceFakeList : sentAbsenceFakeList,
        receivedAbsenceFakeList : receivedAbsenceFakeList
    }
}