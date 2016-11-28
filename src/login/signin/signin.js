'use strict';

module.exports = function ($state, LoginService, $cookies, $mdDialog) {

    var vm = this;

    vm.signin = signin;

    function signin(user){
        console.log(user)

        LoginService.signin(user.username,user.password, function (response) {
            console.log(response.data)
            var currentUser = response.data;
            $cookies.putObject('currentUser', currentUser);
            $mdDialog.hide();
            $state.go('root');
        });

    }

};

