'use strict';

module.exports = function controller(CraService, ActivityService, $scope){

    var vm = this;

    $scope.selectedId;
    vm.content=[]


    $scope.$watch(function(scope) { return scope.selectedId }, function(){
        //alert($scope.selectedId)
        if ($scope.selectedId > 0)
            vm.secondLocked = false;
    })

    init();

    function init(){
        vm.headers=[
            {name: 'Id', field:'id'},
            {name: 'Mois', field: 'month'},
            {name: 'Validation', field:'validation'},
            {name: 'Statut', field: 'status'},
            {name: 'Mis à jour par', field: 'lastModifyBy'},
            {name: 'Date de mis à jour', field: 'updated'},
            {name: 'Action', field: 'action'}
        ];
        vm.sortable = ['id','month', 'validation','status','lastModifyBy','lastUpdatedTime'];
        vm.count=5
        vm.currentpage=0;
        getAllCras()

    }

    function getAllCras(){
        var myuserid=1;
        CraService.mylist(myuserid, function(response){
            var rawcra = response.data;
            var finalcra=[];
            for (var i=0;i<rawcra.length;i++){
                var monthobj = new Date(rawcra[i].month);
                var year = monthobj.getFullYear();
                var month = monthobj.getMonth();
                var updatedobj = new Date(rawcra[i].updated);
                console.log(updatedobj)
                var cradata ={
                    "id": rawcra[i].id,
                    "month": year+'-'+month,
                    "status":rawcra[i].status,
                    "updated": updatedobj.toLocaleDateString() +' '+updatedobj.toLocaleTimeString() ,
                    "lastModifyBy": rawcra[i].lastModifyUser.firstName+' '+rawcra[i].lastModifyUser.lastName
                };
                finalcra.push(cradata);
            }
            vm.content =finalcra
        })
    }

    $scope.$on('sendDeleteId', function(event,cra){
        CraService.delete(cra.id,function (response) {
            if (response.status ==200){
                var index = vm.content.indexOf(cra);
                vm.content.splice(index,1);
            }else{
                alert('System internal error');
            }
        })
    })

    $scope.$on('sendCurrentPage', function(event,currentPage){
        vm.currentpage=currentPage;
        CraService.fakelist(vm.currentpage, function(response){
            var rawcra = response.data;
            var finalcra=[];
            for (var i=0;i<rawcra.length;i++){
                var cradata ={
                    "id": rawcra[i].id, "month": rawcra[i].month,"firstName":rawcra[i].provider.firstName,
                    "lastName":rawcra[i].provider.lastName, "status":rawcra[i].status,"Date": (new Date(rawcra[i].updated)).toISOString(),
                    "lastModifyBy": rawcra[i].lastModifyUser.firstName+' '+rawcra[i].lastModifyUser.lastName
                };
                finalcra.push(cradata);
            }
            vm.content.splice.apply(vm.content, [vm.content.length, 0].concat(finalcra))
            //vm.content =finalcra
        })
    })


    function getAllActivities() {
        ActivityService.list($scope.selectedId, function (response) {
            //console.log(response.data)
            vm.activities = response.data;
        })
    }


};