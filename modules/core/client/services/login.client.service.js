'use strict';

angular.module('login')
    .service('loginService', ['$http', function($http){
        var baseUrl = "/api/login";
        this.post = function(user){
            return $http.post(baseUrl, user);
        };
    }]);
