'use strict';

module.exports = function controller(AbsenceService, MyProfile, $scope, $cookies){

    var vm = this;
    vm.content=[];
    vm.toggleSearch = false;
    vm.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
    vm.sortable = ['id','firstName', 'lastName','email','mobilePhone','address','position', 'role'];
    vm.count = 5;

    init();

    function init() {
        vm.currentpage=0;
        vm.headers = [{name:'Id', field:'id'},
            {name: 'Début', field:'starttime'},
            {name: 'Fin', field:'endtime'},
            {name: 'Statut', field: 'status'},
            {name: 'Demandeur', field: 'provider'},
            {name: 'Manager', field:'validator'},
            {name: 'Mis à jour par', field:'lastModifyBy'},
            {name: 'Date de mis à jour', field:'updated'},
            {name: 'Action', field: 'action'}];
        vm.statusflag={
            'TO_VALIDATE': 'blankflag',
            'AGREED': 'greenflag',
            'REFUSED': 'redflag'
        };
        AbsenceService.mylist(vm.currentpage, MyProfile.getCurrentUser().id, function (response) {
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
            absence['starttime']=convertToDateString(absence['starttime']);
            absence['endtime']=convertToDateString(absence['endtime']);
            absence['updated']=convertToDateString(absence['updated']);
        })
        return absences;
    }

    function convertToDateString(obj){
        var dateObj = new Date(obj);
        return dateObj.toLocaleDateString()+' '+ dateObj.toLocaleTimeString();
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
        AbsenceService.mylist(vm.currentpage, MyProfile.getCurrentUser().id, function (response) {
            var absences = adaptToHeaders(response.data);
            vm.content.splice.apply(vm.content, [vm.content.length, 0].concat(absences))
        })
    })

};