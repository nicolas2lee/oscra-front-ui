'use strict';
/*
 * http://codepen.io/anon/pen/XjPprv
 * */
module.exports = function controller(ActivityTypeService, $scope, $rootScope){

    var vm = this;
    init();
    function init(){
        vm.headers=[
            {name: 'Id', field: 'id'},
            {name: 'Name', field: 'name'},
            {name: 'Updated', field: 'Date'},
            {name: 'Action', field: 'action'}
            ];

        ActivityTypeService.list(function (response) {
           //console.log(response.data);
            var rawdata = response.data;
            var finaldata=[];
            for (var i=0;i<rawdata.length;i++){
                var data ={
                    "id": rawdata[i].id,
                    "name":rawdata[i].name,
                    "Date": (new Date(rawdata[i].updated)).toISOString()
                };
                finaldata.push(data);
            }
            vm.content =finaldata
        })
    }


    $rootScope.$on('sendAddIdViaSimpleTable', function(event,answer){
        ActivityTypeService.create({'name':answer.toUpperCase()}, function (response) {
            if (response.status ==200){
                if (response.data == null || response.data==[]){
                    alert('you have already added this element');
                }else{
                    vm.content.push({
                        "id": response.data.id,
                        "name":response.data.name,
                        "Date": (new Date(response.data.updated)).toISOString()
                    })
                    $rootScope.$broadcast('AddActivityTypeDone');
                }
            }else{
                alert('System internal error');
            }
        })
    });

    $rootScope.$on('sendModifyIdViaSimpleTable', function(event,element){
        ActivityTypeService.modify(element, function (response) {
            if (response.status ==200){
                //should handle the case when the modified name is the same as one of element
                $rootScope.$broadcast('ModifyActivityTypeDone');
            }else{
                alert('System internal error');
            }
        })
    });

    $scope.$on('sendDeleteIdViaSimpleTable', function(event,activityType){
        console.log('delete event')
        ActivityTypeService.delete(activityType.id,function (response) {
            if (response.status ==200){
                var index = vm.content.indexOf(activityType);
                vm.content.splice(index,1);
            }else{
                alert('System internal error');
            }
        })
    })


};