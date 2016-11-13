'use strict';
angular.module('oscra-ui.table').component('mdSimpleTable',{
    bindings: {
        headers: '=',
        content: '='
    },
    template: require('./componentTemplate/simpleTableTemplate.html'),
    controller: function mdSimpleTableController($mdDialog, $scope, $rootScope) {
        var vm=this;


        vm.addNewElement = function(ev) {
            $mdDialog.show({
                controller: require('./../../setting/activitytype/create/create'),
                controllerAs: 'dialog',
                template: require('./../../setting/activitytype/componentTemplate/activityTypeInfo.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        vm.modifyElement = function(element, ev) {
            $mdDialog.show({
                controller: require('./../../setting/activitytype/modify/modify'),
                controllerAs: 'dialog',
                template: require('./../../setting/activitytype/componentTemplate/activityTypeInfo.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                locals : {
                    element : element
                },
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(answer) {

                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        vm.openOffscreenConfirm = function(element,ev) {
            var confirm =  $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title('Opening from offscreen')
                .textContent('Are you sure to delete the type of activity ?')
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
                $scope.$emit('sendDeleteIdViaSimpleTable', element);
            }, function() {

            });
        };
    }
});


/*
 app.directive('showFocus', function($timeout) {
 return function(scope, element, attrs) {
 scope.$watch(attrs.showFocus,
 function (newValue) {
 $timeout(function() {
 newValue && element.focus();
 });
 },true);
 };
 });
 */

//UNCOMMENT BELOW TO BE ABLE TO RESIZE COLUMNS OF THE TABLE
/*
 app.directive('mdColresize', function ($timeout) {
 return {
 restrict: 'A',
 link: function (scope, element, attrs) {
 scope.$evalAsync(function () {
 $timeout(function(){ $(element).colResizable({
 liveDrag: true,
 fixed: true

 });},100);
 });
 }
 }
 });
 */
