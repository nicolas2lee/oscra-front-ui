'use strict';

module.exports = function ($state, LoginService) {

    var vm = this;

    vm.signin = signin;

    function signin(user){
        console.log(user)
        var username='test';
        var password='test';
        LoginService.signin(username,password, function (response) {

        });
        $state.go('root');
    }

};

