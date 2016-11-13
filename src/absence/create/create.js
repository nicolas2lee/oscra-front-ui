'use strict';

module.exports = function controller(UserService, AbsenceService, $scope){

    var vm = this;

    vm.loadAbsenceDetail = false;
    init();

    function init(){
        vm.needLoadData = 1;
        UserService.list(function (response) {
            vm.users = response.data;
            vm.needLoadData-=1;
        })
    }

    vm.updateSelectedUser = function(user){
        vm.initabsence = {
            provider: user
        };
        vm.loadAbsenceDetail=true;
    };

    vm.getSelectedText = function(element) {
        //console.log('elem ' +element)
        if (element !== undefined) {
            return element;
        } else {
            return "Choisir un element";
        }
    };


    $scope.$on('sendAbsence', function(event, absence){
        console.log(absence)
        console.log(vm.selectedUser)

        AbsenceService.create(absence, vm.selectedUser.id, 2, vm.selectedUser.id,  function (response) {
            if (response.status ==200){
                alert('ok');
                $scope.$broadcast("absenceUpdated")
                //$state.go('root.userall');
            }else{
                alert('System internal error');
            }
        })
    })

};