'use strict';


angular.module('oscra-ui.cra').component('crainfo', {
    bindings: {
        craprovider: '=',
        initcra: '=',
        activities: '=',
        status: '=',
        days:'='
    },
    template: require('./componentTemplate/craInfo.html'),
    controller: function craInfoController($scope, $mdToast){
        var vm=this;
        init();
        vm.addActivity = addActivity;
        vm.chooseDay = chooseDay;

        vm.getSelectedText = getSelectedText;

        vm.saveAsDraft = saveAsDraft;
        vm.submit = submit;

        function saveAsDraft(){
            var persistActivities=handleActivities();
            vm.initcra['activities']=persistActivities;
            if (checkTotal()){
                vm.initcra['status']='NOT_TRANSIMITTED';
                $scope.$emit('sendCra', vm.initcra);
            }
        }

        function getSelectedText(element) {
            if (element !== undefined) {
                return element;
            } else {
                return "Choisir un element";
            }
        }

        function addActivity(activity){
            console.log('entering add activity');
            if (checkActivity(activity)){
                vm.craActivities.unshift(activity);
                var actcount=[]
                for (var i=0;i<32;i++){
                    actcount[i]=0;
                }
                vm.clickcount[activity]=actcount;
            }
            console.log(vm.craActivities)
        }

        function checkActivity(a){
            if (a==undefined || a==null){
                alert('Choisir un type d\'activité');
                return false;
            }else if(vm.craActivities.indexOf(a)>=0){
                alert('Vous avez déjà ajouté ce type d\'activité');
                return false;
            }
            return true;
        }

        function init(){
            var monthobj=new Date(vm.initcra.month);
            vm.showMonth = monthobj.getFullYear() + '-' + (monthobj.getMonth()+1);
            // add total
            vm.craActivities = [];
            vm.clickcount=[];
            // add all exisited activities
            vm.initcra.activities.forEach(function(activity){
                var startday = (new Date(activity.starttime)).getDate();
                var endday = (new Date(activity.endtime)).getDate();
                var actcount=clearMonthDayCounter();

                for (var day=startday;day<=endday;day++){
                    actcount[day]= activity.amorpm == 0 ? 2: 1;
                }
                if (vm.craActivities.indexOf(activity.activityType.name)<0){
                    vm.craActivities.push(activity.activityType.name);
                    vm.clickcount[activity.activityType.name]=actcount;
                }else{
                    mergeCounter(actcount, activity.activityType.name);
                }
            })
            vm.craActivities.push('Total');
            vm.clickcount['Total']=clearMonthDayCounter();
            //vm.clickcount['Total']=countTotal();
        }

        function mergeCounter(src, aname){
            for(var i=0;i<src.length;i++){
                vm.clickcount[aname][i]+=src[i];
            }
        }
        
        function countTotal() {
            vm.craActivities.forEach(function (activityname) {
                if (activityname != 'Total') {
                    for (var i=0; i<activityname.length;i++){
                        vm.clickcount['Total'][i]+=vm.clickcount[activityname][i]
                    }
                }
            })
        }


        function clearMonthDayCounter(){
            var daycounter=[];
            for (var i=0;i<32;i++){
                daycounter[i]=0;
            }
            return daycounter;
        }

        function chooseDay(activity,day){
            var newact = (vm.clickcount[activity][day.getDate()]+1)%3;
            vm.clickcount[activity][day.getDate()] = newact;
            var sum=0;
            for (var i=0;i<vm.craActivities.length;i++){
                if (vm.craActivities[i] !=  undefined && vm.craActivities[i]!= 'Total'){
                    switch(vm.clickcount[vm.craActivities[i]][day.getDate()]){
                        case 0:
                            sum+=0;break;
                        case 1:
                            sum+=0.5;break;
                        case 2:
                            sum+=1;break;
                        default:
                            break;
                    }
                }
            }
            vm.clickcount[activity][day.getDate()]= newact;
            vm.clickcount['Total'][day.getDate()] = sum;
        }

       function submit(){
            var persistActivities=handleActivities();
            vm.initcra['activities']=persistActivities;
            if (checkTotal()){
                vm.initcra['status']='TRANSIMITTED_TO_VALIDATE';
                $scope.$emit('sendCra', vm.initcra);
            }
       }


/* http://codepen.io/pen/ */
        function checkTotal(){
            for (var i=0; i<vm.clickcount['Total'].length;i++){
                if (vm.clickcount['Total'][i]>1){
                    console.log(i)
                    $mdToast.show({
                        hideDelay   : 3000,
                        position    : 'top right',
                        controller  : function(){

                        },
                        template :  '<md-toast>' +
                                        '<span class="md-toast-text" flex>day {{parm}} is not valid</span>' +
                                        '<md-button class="md-highlight" ng-click="openMoreInfo($event)">More info </md-button> ' +
                                        '<md-button ng-click="closeToast()">Close </md-button> ' +
                                    '</md-toast>',
                        highlightAction : true,
                        locals:{parm:i}
                    });
                    return false;
                }
            }
            return true;
        }

        function handleActivities(){
            var persistActivities=[];
            for (var i=0;i<vm.activities.length;i++){
                if (vm.activities[i]!='Total' && vm.clickcount[vm.activities[i]]!== undefined ){
                    var arrayToInsert = handleEachActivity(vm.activities[i],vm.clickcount[vm.activities[i]])
                    persistActivities.splice.apply(persistActivities, [persistActivities.length, 0].concat(arrayToInsert));
                }
            }
            return persistActivities;
        }

        function handleEachActivity(actname,actcount){
            var allactions=[];
            var isStarted=false;
            var count=0, starttime=0, endtime=0;
            for (var i=0;i <vm.days.length;i++){
                switch(isStarted){
                    case false:
                        switch(actcount[vm.days[i].getDate()-1]){
                            case 0:
                                break;
                            case 1: //0.5
                                starttime = vm.days[i].getDate();
                                endtime=vm.days[i].getDate();
                                allactions.push(createActionObject(starttime, endtime, actname,1));
                                break;
                            case 2:// 1 day
                                isStarted = true;
                                starttime = vm.days[i].getDate();
                                break;
                        }
                        break;
                    case true:
                        switch(actcount[vm.days[i].getDate()-1]){
                            case 0:
                                endtime = vm.days[i].getDate();
                                allactions.push(createActionObject(starttime, endtime, actname,0));
                                isStarted = false;
                                break;
                            case 1: //0.5 am
                                endtime=vm.days[i].getDate();
                                allactions.push(createActionObject(starttime, endtime, actname,1));
                                break;
                            case 2://0.5 pm
                                break;
                        }
                        break;
                }
            }
            return allactions;
        }

        function createActionObject(starttime,endtime,actname,amOrpm){
            var monthObj= new Date(vm.initcra.month);
            var month=monthObj.getMonth();
            var year=monthObj.getFullYear();
            return {
                'starttime': new Date(year,month, starttime),
                'endtime': new Date(year,month, endtime),
                'amorpm': amOrpm,
                'duration': endtime-starttime+1,
                'activityType': {'name':actname}
            }
        }
    }
});

