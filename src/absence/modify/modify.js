'use strict';

module.exports = function controller(AbsenceService, ActivityTypeService, MyProfile, $stateParams, $scope, $state){

    var vm = this;

    init();

    function init() {
        AbsenceService.findById($stateParams.absenceId, function (response) {
            vm.initabsence=response.data;
            vm.initabsence.starttime = new Date(vm.initabsence.starttime);
            vm.initabsence.endtime = new Date(vm.initabsence.endtime)
        });
        var category = 'conge';
        ActivityTypeService.listCategoryAbsence(category,function(response){
            console.log(response.data)
            vm.absencetypes = response.data;
        });
    }

    $scope.$on('sendAbsence', function(event,absence){
        console.log(absence)
        AbsenceService.modify(absence, absence.absenceType.id, absence.provider.id, absence.validator.id, MyProfile.getCurrentUser().id,  function (response) {
            if (response.status ==200){
                alert('ok');
                $scope.$broadcast("absenceUpdated")
                $state.go('root.absencelist');
            }else{
                alert('System internal error');
            }
        })
    })

};