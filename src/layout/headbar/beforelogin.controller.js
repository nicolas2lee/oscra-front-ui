'use strict';

module.exports = function ($scope, $rootScope, $mdDialog, MyProfile, $state) {

    var vm = this;

    vm.login = login;

    init();

    function init(){
        if (MyProfile.getCurrentUser() != undefined && MyProfile.getCurrentUser() != null){
            if (MyProfile.getCurrentUser().role == "USER") {
                $state.go('root');
            }
        }
    }

    function login(ev){
        $mdDialog.show({
            controller: require('./../../login/signin/signin'),
            controllerAs: 'signinCtrl',
            template: require('./../../login/signin/signin.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }

};

