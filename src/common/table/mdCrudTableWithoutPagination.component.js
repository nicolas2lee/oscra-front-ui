'use strict';

angular.module('oscra-ui.table').component('mdCrudTableWithoutPagination',{
    bindings: {
        currentpage : '=',
        headers: '=',
        content: '=',
        sortable: '=',
        filters: '=',
        customClass: '=',
        listurl: '@',
        modifyurl : '@',
        deleteurl : '@',
        idkey : '@'
    },
    template: require('./componentTemplate/crudTableTemplateWithoutPagination.html'),
    controller: function mdCrudTableWithoutPagination($filter, $mdDialog, $scope) {
        var vm=this;
        var orderBy = $filter('orderBy');
        console.log(vm.content)
//export
        vm.loadMore = loadMore;
        vm.getNumber = getNumber;
        vm.handleSort = handleSort;
        vm.order = order;
        vm.openOffscreenConfirm = openOffscreenConfirm;
        //vm.order(vm.sortable[0],false);

//declaration
        function loadMore(){
            vm.currentpage+=1;
            $scope.$emit('sendCurrentPage', vm.currentpage);
        }

        function getNumber (num) {
            return new Array(num);
        }

        function handleSort (field) {
            if (vm.sortable.indexOf(field) > -1) { return true; } else { return false; }
        }

        function order (predicate, reverse) {
            vm.content = orderBy(vm.content, predicate, reverse);
            vm.predicate = predicate;
        }

        function openOffscreenConfirm (element,ev) {
            var confirm =  $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title('Opening from offscreen')
                .textContent('Are you sure to delete the user ?')
                .ariaLabel('Offscreen Demo')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Cancel')
                .openFrom({ // Or you can specify the rect to do the transition from
                    top: -50,
                    width: 30,
                    height: 80
                })
                .closeTo({
                    left: 1500
                });
            $mdDialog.show(confirm).then(function() {
                $scope.$emit('sendDeleteId', element);
            }, function() {

            });
        }
    }
})

/*
 .directive('showFocus', function($timeout) {
 return function(scope, element, attrs) {
 scope.$watch(attrs.showFocus,
 function (newValue) {
 $timeout(function() {
 newValue && element.focus();
 });
 },true);
 };
 })*/


