'use strict';

module.exports = function controller(AbsenceService, ActivityTypeService, $scope, $state){

    var vm = this;
    vm.currentUserId = 1;

    init();

    function init(){
        var category = 'conge';
        ActivityTypeService.listCategoryAbsence(category,function(response){
            console.log(response.data)
            vm.absencetypes = response.data;
        });
    }



    $scope.$on('sendAbsence', function(event, absence){
        console.log(absence)

        var currentUserid = 1;
        AbsenceService.create(absence, absence.absenceType.id, vm.currentUserId, 2, vm.currentUserId,  function (response) {
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