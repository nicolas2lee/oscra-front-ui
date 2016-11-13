module.exports = function controller($rootScope, element, $mdDialog) {
    console.log('elemene in modif is ')
    console.log(element)
    var vm=this;
    vm.title='Modifier le type d\'activite';
    console.log('modify scope')

    vm.answer = function(answer) {

        var activityType = element;
        activityType['name']=answer.toUpperCase();
        console.log('the answer is '+activityType)
        $rootScope.$emit('sendModifyIdViaSimpleTable', activityType);

        $rootScope.$on('ModifyActivityTypeDone',function(event){
            $mdDialog.hide(answer);
        })
    };
}