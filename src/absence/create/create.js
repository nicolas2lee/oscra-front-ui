'use strict';

module.exports = function controller(AbsenceService, $scope){

    var vm = this;


    init();

    function init(){

    }



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