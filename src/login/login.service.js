
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
    this.getCurrentUser = function(){
        var currentUserStr= $cookies.get('currentUser');
        return angular.fromJson(currentUserStr)
    }

    this.setCurrentUser = function (currentUser) {
        $cookies.putObject('currentUser', currentUser);
    }
}