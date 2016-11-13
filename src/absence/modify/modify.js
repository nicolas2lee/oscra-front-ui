'use strict';

module.exports = function controller(AbsenceService, $stateParams, $scope){

    var vm = this;

    init();

    function init() {
        AbsenceService.findById($stateParams.absenceId, function (response) {
            vm.initabsence=response.data;
            vm.initabsence.starttime = new Date(vm.initabsence.starttime);
            vm.initabsence.endtime = new Date(vm.initabsence.endtime)
        });
    }

    $scope.$on('sendAbsence', function(event,absence){
        console.log(absence)
        AbsenceService.modify(absence, absence.provider.id, absence.validator.id, absence.lastModifyUser.id,  function (response) {
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