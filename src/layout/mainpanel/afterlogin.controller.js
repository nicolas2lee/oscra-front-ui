'use strict';

module.exports = function ($scope,$rootScope ) {

    var vm = this;
    vm.isSideNavOpen= true;
    $rootScope.$on('openLeftSideNav', function (event,data) {
        console.log('receive event in mainpanel')
        vm.isSideNavOpen = !vm.isSideNavOpen

    });
    vm.openSideNavPanel = function () {

        vm.isSideNavOpen = !vm.isSideNavOpen
    };
    vm.closeSideNavPanel = function () {
        vm.isSideNavOpen = !vm.isSideNavOpen
    };

};

