
angular.module('oscra-ui.login')
    .factory('LoginService', service)
    .service('MyProfile', getCurrentUserViaCookie);

function service(API){

    function signin(username, password, callBack) {
        API.post('login?username='+username+'&password='+password, null, callBack);
    }

    function signout( callBack) {
        API.post('logout', null, callBack);
    }

    return {

        signin  : signin,
        signout : signout
    }
}

function getCurrentUserViaCookie($cookies){
    var currentUserStr= $cookies.get('currentUser');
    this.currentUser = angular.fromJson(currentUserStr);
}