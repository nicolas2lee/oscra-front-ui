
angular.module('oscra-ui.user').factory('UserService', service);

function service(API){

    var USERS = 'users/';

    function fakelist(dstPage, callBack) {
        API.get(USERS+'fakeall?dstPage='+dstPage, null, callBack);
    }

    function list(callBack) {
        API.get(USERS+'all', null, callBack);
    }

    function create(user, callBack) {
        API.post(USERS+'add', user, callBack);
    }

    function modify(user, callBack) {
        API.post(USERS+'update', user, callBack);
    }

    function remove(userId, callBack) {
        API.post(USERS+'delete?userId='+userId, null, callBack);
    }

    function findById(userId, callBack) {
        API.get(USERS+'findById?userId='+userId, null, callBack);
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