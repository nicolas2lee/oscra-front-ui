'use strict';

module.exports = function controller(CraNotifService, AbsenceNotifService, MyProfile, $scope){

    var vm = this;
    init();

    function init(){
        //===================================== Cra Notif setting =======================================
        vm.initcranotifloaded=false;
        vm.cranotifCurrentpage=0;
        vm.cranotifHeaders=[{name:'Id', field:'id'},
            {name: 'Information du compte-rendu d\'activité(CRA) ', field: 'cra'},
            {name: 'Message envoyé par', field: 'crafrom'},
            {name: 'Date de mis à jour', field: 'updated'},
            {name: 'outlinkid', field: 'outlinkid'},
            {name: 'Action', field: 'action'}
        ];
        vm.cranotifSortable = ['id','cra', 'crafrom','description'];
        CraNotifService.receivedCraFakeList(vm.cranotifCurrentpage, MyProfile.currentUser.id, function(response){
            console.log('cranotif works')
            console.log(response.data)
            vm.cranotifContent=adaptCraDataToDisplay(response.data);
            vm.initcranotifloaded=true;
        })

        //===================================== Absence Notif setting =======================================
        vm.initabsencenotifloaded=false;
        vm.absencenotifCurrentpage=0;
        vm.absencenotifHeaders=[{name:'Id', field:'id'},
            {name: 'Information du Congé', field: 'absence'},
            {name: 'Message envoyé par', field: 'absencefrom'},
            {name: 'Date de mis à jour', field: 'updated'},
            {name: 'outlinkid', field: 'outlinkid'},
            {name: 'Action', field: 'action'}
        ];
        vm.absencenotifSortable = ['id', 'absence','absencefrom'];
        AbsenceNotifService.receivedAbsenceFakeList(vm.absencenotifCurrentpage, MyProfile.currentUser.id, function (response) {
            vm.absencenotifContent=adaptAbsenceDataToDisplay(response.data);
            vm.initabsencenotifloaded = true;
        })
    }

    function adaptCraDataToDisplay(rawdata){
        console.log(rawdata)
        var finaldata=[];
        rawdata.forEach(function(anotif){
            var updatedObj = new Date(anotif.updated);
            finaldata.push({
                id : anotif.id,
                cra : createCraString(anotif.cra, anotif),
                crafrom : anotif.crafrom.firstName + ' ' + anotif.crafrom.lastName,
                outlinkid: anotif.cra.id,
                updated: updatedObj.toLocaleDateString()+''+updatedObj.toLocaleTimeString()
            })
        })
        return finaldata
    }

    function adaptAbsenceDataToDisplay(rawdata){
        console.log(rawdata)
        var finaldata=[];
        rawdata.forEach(function(anotif){
            var updatedObj = new Date(anotif.updated);
            finaldata.push({
                id : anotif.id,
                absence : createAbsenceString(anotif.absence, anotif),
                absencefrom : anotif.absencefrom.firstName + ' ' + anotif.absencefrom.lastName,
                outlinkid: anotif.absence.id,
                updated: updatedObj.toLocaleDateString()+''+updatedObj.toLocaleTimeString()
            })
        })
        return finaldata
    }

    function createCraString(cra, notif) {
        var cramonth = new Date(notif.cra.month);
        var year = cramonth.getFullYear();
        var month = cramonth.getMonth();
        var notifstatus;
        switch (notif.notifEntityStatus){
            case 'TO_VALIDATE':
                notifstatus = ' à valider';
                break;
            case 'AGREED':
                notifstatus = ' est approuvé';
                break;
            case 'REFUESED':
                notifstatus = ' est refusé';
                break;
        }
        return 'CRA '+ notif.cra.id + ' du mois ' + month +'/'+ year + notifstatus;
    }

    function createAbsenceString(absence, notif) {

        var notifstatus;
        switch (notif.notifEntityStatus){
            case 'TO_VALIDATE':
                notifstatus = ' à valider';
                break;
            case 'AGREED':
                notifstatus = ' est approuvé';
                break;
            case 'REFUESED':
                notifstatus = ' est refusé';
                break;
        }
        var starttime = (new Date(notif.absence.starttime)).toLocaleDateString();
        var endtime = (new Date(notif.absence.endtime)).toLocaleDateString()
        return  'Congé '+ notif.absence.id + ' de '+starttime + ' à '+endtime + notifstatus;
    }

};