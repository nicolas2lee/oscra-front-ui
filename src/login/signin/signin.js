'use strict';

module.exports = function ($state) {

    var vm = this;

    vm.signin = signin;

    function signin(){

        $state.go('root');
    }

};

