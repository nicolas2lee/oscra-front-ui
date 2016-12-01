'use strict';

module.exports = function ($scope, $rootScope, $mdDialog, MyProfile, $state) {

    var vm = this;

    init()
    function init() {
        if (MyProfile.getCurrentUser() != undefined && MyProfile.getCurrentUser() != null ){
            if (MyProfile.getCurrentUser().role == "USER") {
                $state.go('root');
            }
        }
    }
};

