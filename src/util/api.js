angular.module('oscra-ui.util', []);

angular.module('oscra-ui.util').factory('API', service);

function service($http){

    var apiServerUrl = 'http://localhost:8090/api/';

    function callApi(method, url, data, callback){
        $http({
            method: method,
            url: apiServerUrl+url,
            data: data
        }).then(function successCallback(response) {
            callback(response)
        });
    }

    function get(url, data, callback){
        callApi('GET', url, data, callback)
    }

    function post(url, data, callback) {
        callApi('POST', url, data, callback)
    }


    return {
        get : get,
        post :post
    }
}