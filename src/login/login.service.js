
angular.module('oscra-ui.login').factory('LoginService', service);

function service(API){

    function signin(username, password, callBack) {
        API.get('login?username='+username+'&passwors='+password, null, callBack);
    }

    return {
        signin : signin
    }
}