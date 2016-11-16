
angular.module('oscra-ui.user').factory('UserService', service);

function service(API){

    var USERS = 'users/';


    function modify(user, callBack) {
        API.post(USERS+'update', user, callBack);
    }


    function findById(userId, callBack) {
        API.get(USERS+'findById?userId='+userId, null, callBack);
    }


    return {
        modify : modify,
        findById : findById
    }
}