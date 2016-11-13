'use strict';

module.exports = function controller(UserService, $state, $scope){

    var vm = this;
    vm.title="Créer un nouveau utilisateur";
    vm.inituser=null;

    $scope.$on('sendUser', function(event,user){
        console.log(user)
        UserService.create(user,function (response) {
            if (response.status ==200){
                alert('ok');
                $scope.$broadcast("userUpdated")
                $state.go('root.userall');
            }else{
                alert('System internal error');
            }
        })


    })
};