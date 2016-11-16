'use strict';

module.exports = function controller(AbsenceService, $scope){

    var vm = this;
    vm.content=[];
    vm.toggleSearch = false;
    vm.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
    vm.sortable = ['id','firstName', 'lastName','email','mobilePhone','address','position', 'role'];
    vm.count = 5;
    vm.currentUserId=1;

    init();

    function init() {

        vm.currentpage=0;
        vm.headers = [{name:'Id', field:'id'},
            {name: 'Début', field:'starttime'},
            {name: 'Fin', field:'endtime'},
            {name: 'Statut', field: 'statut'},
            {name: 'Provider', field: 'provider'},
            {name: 'Validator', field:'validator'},
            {name: 'LastModifyBy', field:'lastModifyBy'},
            {name: 'Action', field: 'action'}];
        AbsenceService.mylist(vm.currentpage, vm.currentUserId, function (response) {
            var absences = adaptToHeaders(response.data);
            console.log(absences)
            vm.content = absences;

        })
    }

    function adaptToHeaders(absences){
        absences.forEach(function(absence){
            absence['provider']=convertUserObjToName(absence['provider']);
            absence['validator']=convertUserObjToName(absence['validator']);
            absence['lastModifyBy']=convertUserObjToName(absence['lastModifyUser']);
            console.log(absence['starttime'])
            absence['starttime']=convertToDateString(absence['starttime']);
            absence['endtime']=convertToDateString(absence['endtime']);
        })
        return absences;
    }

    function convertToDateString(obj){
        return (new Date(obj)).toLocaleDateString();
    }
    function convertUserObjToName(user){
        return user.firstName+' '+ user.lastName;
    }

    $scope.$on('sendDeleteId', function(event,absence){
        AbsenceService.delete(absence.id,function (response) {
            if (response.status ==200){
                var index = vm.content.indexOf(absence);
                vm.content.splice(index,1);
            }else{
                alert('System internal error');
            }
        })
    })

    $scope.$on('sendCurrentPage', function(event,currentPage){
        vm.currentpage=currentPage;
        AbsenceService.mylist(vm.currentpage, vm.currentUserId, function (response) {
            var absences = adaptToHeaders(response.data);
            vm.content.splice.apply(vm.content, [vm.content.length, 0].concat(absences))

        })
    })

};