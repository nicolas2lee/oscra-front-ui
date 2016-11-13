'use strict';

module.exports = function ($scope, $rootScope) {

    var vm = this;
    vm.isSideNavOpen= false;

    vm.openSideNavPanel = function () {
        console.log('clicked')
        sendOpenLeftSideNavEvent()
        vm.isSideNavOpen = !vm.isSideNavOpen
    };
    vm.closeSideNavPanel = function () {
        vm.isSideNavOpen = !vm.isSideNavOpen
    };

    function sendOpenLeftSideNavEvent(){
        $rootScope.$emit('openLeftSideNav',[])
    }

};

