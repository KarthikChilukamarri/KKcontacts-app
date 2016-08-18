'use strict';

var app = angular.module('login', []);

app.controller('loginCtrl', ['$scope','loginService', function($scope, loginService){
    $scope.submit = function(user){
        console.log(user);
        loginService.post(user)
            .success(function(data){
            console.log("User Found!");
               // $state.go()
            })
            .error(function(err){
                console.log("User Not Found!");
            });
    }
}]);
