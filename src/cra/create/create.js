'use strict';

module.exports = function controller(ActivityTypeService, UserService, CraService, $scope, $state){

    var vm = this;
    vm.years =[];
    vm.months = [];
    vm.days=[];
    vm.updateYearMonth = updateYearMonth;
    init();

    function init() {
        vm.needLoadData = 2;
        vm.loadCraDetail = false;
        vm.activitiesHeader=[];
        vm.currentUserId = 1;
        vm.status =[ 'NOT_TRANSIMITTED',
            'TRANSIMITTED_NOT_VALIDATED',
            'VALIDATED_TRANSIMITTED'];
        UserService.findById(vm.currentUserId, function(response){
            vm.currentUser=response.data;
            vm.needLoadData-=1;
        })
        ActivityTypeService.list(function(response){
            var activityTypes = response.data;
            for (var i=0; i<activityTypes.length;i++){
                vm.activitiesHeader.push(activityTypes[i].name);
            }
            vm.needLoadData-=1;
        })

        var yearBase = 2016;
        vm.years=getYears(getOffset(yearBase),getRange(yearBase))
        initMonth();

        vm.initcra = {
            'activities' : []
        };
    }

    function initMonth() {
        for (var  i=0;i<12;i++){
            vm.months.push(i+1)
        }
    }

     function updateYearMonth(month, year){
        vm.initcra={
            provider: vm.currentUser,
            status: 'NOT_TRANSIMITTED',
            month: new Date(vm.selectedYear, vm.selectedMonth-1),
            activities: []
        };
        vm.days = getDaysInMonth(vm.selectedMonth-1, vm.selectedYear);
         vm.loadCraDetail = true;
    }

    vm.getSelectedText = function(element) {
        if (element !== undefined) {
            return element;
        } else {
            return "Choisir un element";
        }
    };

    function getRange(yearBase){
        var currentYear = new Date().getFullYear();
        return currentYear - yearBase
    }

    function getOffset(yearBase){
        var currentYear = new Date().getFullYear();
        return yearBase - currentYear;
    }

    function getYears(offset, range){
        var currentYear = new Date().getFullYear();
        var years = [];
        for (var i = 0; i < range + 1; i++){
            years.push(currentYear + offset + i);
        }
        return years;
    }

    function getDaysInMonth(month, year) {
        // attention: here is the local time, when display the time, by default, it's in UTC
        var date = new Date(year, month, 1, 5);
        var days = [];
        while (date.getMonth() == month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    $scope.$on('sendCra', function(event,cra){
        var providerId = vm.currentUser.id;
        var validatorId = 2;
        var lastModifyUserId = 2;
        delete cra["provider"];
        /*
        delete initcra["validator"];
        delete initcra["lastModifyUser"];*/
        CraService.create(cra, providerId, validatorId, lastModifyUserId, function (response){
            console.log(response.data)
            if (response.status ==200){

                $state.go('root.cralist');
            }else{
                alert('System internal error');
            }
        })
    });
}
