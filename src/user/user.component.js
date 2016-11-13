'use strict';


angular.module('oscra-ui.user').component('userinfo', {
    bindings: {
        title : '=',
        user : '='
    },
    template: require('./componentTemplate/userInfo.html'),
    controller: function userInfoController($scope){
        var vm=this;
        vm.isloading = false;
        vm.submit = function(){
            console.log(vm.user)
            vm.isloading = true;
            $scope.$emit('sendUser', vm.user);
        }
        $scope.$on('userUpdated', function(){
            vm.isloading = false;
        })
    }
});
