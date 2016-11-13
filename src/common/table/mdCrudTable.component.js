'use strict';

angular.module('oscra-ui.table').component('mdCrudTable',{
    bindings: {
        currentpage : '=',
        headers: '=',
        content: '=',
        sortable: '=',
        filters: '=',
        customClass: '=',
        count: '=',
        listurl: '@',
        modifyurl : '@',
        deleteurl : '@',
        idkey : '@'
    },
    template: require('./componentTemplate/crudTableTemplate.html'),
    controller: function mdCrudTableController($filter, $mdDialog, $scope) {
        var vm=this;
        var orderBy = $filter('orderBy');
//export
        vm.tablePage = 0;
        vm.nbOfPages = nbOfPages;
        vm.loadMore = loadMore;

//declaration
        function loadMore(){
            vm.currentpage+=1;
            $scope.$emit('sendCurrentPage', vm.currentpage);
        }

        function nbOfPages(){
            return Math.ceil(vm.content.length / vm.count);
        };
        vm.getNumber = function (num) {
            return new Array(num);
        };
        vm.handleSort = function (field) {
            if (vm.sortable.indexOf(field) > -1) { return true; } else { return false; }
        };
        vm.order = function(predicate, reverse) {
            vm.content = orderBy(vm.content, predicate, reverse);
            vm.predicate = predicate;
        };
        vm.order(vm.sortable[0],false);
        vm.getNumber = function (num) {
            return new Array(num);
        };
        vm.goToPage = function (page) {
            vm.tablePage = page;
        }
        vm.openOffscreenConfirm = function(element,ev) {
            var confirm =  $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title('Opening from offscreen')
                .textContent('Are you sure to delete the user ?')
                .ariaLabel('Offscreen Demo')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Cancel')
                // Or you can specify the rect to do the transition from
                .openFrom({
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
        };


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


