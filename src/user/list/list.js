'use strict';
/*
* http://codepen.io/anon/pen/XjPprv
* */
module.exports = function controller(UserService, $mdToast, $scope, $state){

    var vm = this;
    vm.users=[];
    vm.content=[];
    vm.toggleSearch = false;
    vm.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
    vm.sortable = ['id','firstName', 'lastName','email','mobilePhone','address','position', 'role'];
    vm.count = 5;
    vm.currentpage=0;

    init();

    function init() {
        vm.headers = [{name:'Id', field:'id'},
            {name: 'First Name', field: 'firstName'},
            {name: 'Last Name', field:'lastName'},
            {name: 'Email', field: 'email'},
            {name: 'Mobile Phone', field: 'mobilePhone'},
            {name: 'Address', field: 'address'},
            {name: 'Position', field: 'position'},
            {name: 'Role', field: 'role'},
            {name: 'Action', field: 'action'}];
        UserService.fakelist(vm.currentpage,function (response) {
            vm.users = response.data;
            vm.content = vm.users;
        })
    }
    $scope.$on('sendDeleteId', function(event,user){
        console.log(user)
        UserService.delete(user.id,function (response) {
            if (response.status ==200){
                var index = vm.content.indexOf(user);
                vm.content.splice(index,1);
            }else{
                alert('System internal error');
            }
        })
    })
    $scope.$on('sendCurrentPage', function(event,currentPage){
        vm.currentpage=currentPage;
        UserService.fakelist(vm.currentpage,function (response) {
            var insertUsers = response.data;
            vm.content.splice.apply(vm.content, [vm.content.length, 0].concat(insertUsers))
        })
    })
};