'use strict';


angular.module('oscra-ui.absence').component('absenceinfo', {
    bindings: {
        absence: '=',
        absencetypes: '='
    },
    template: require('./componentTemplate/absenceInfo.html'),
    controller: function absenceInfoController($scope){
        var vm=this;
        vm.isloading = false;
        vm.getSelectedText = getSelectedText;

        vm.submit = function(){
            vm.absence.status='TO_VALIDATE';
            console.log(vm.absence)
            vm.isloading = true;
            $scope.$emit('sendAbsence', vm.absence);
        }

        $scope.$on('absenceUpdated', function(){
            vm.isloading = false;
        })

        function getSelectedText(element) {
            if (element !== undefined) {
                return element.name;
            } else {
                return "Choisir un element";
            }
        }
    }
})
    .filter('dateFormat', function ($filter) {
        return function (input) {
            if (input == null){return '';}
            var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
            return _date.toUpperCase();

        }
    });
