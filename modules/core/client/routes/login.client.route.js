'use strict';

angular
    .module('login')
    .config(function($stateProvider){
    $stateProvider
        .state('loghome', {
            url: '/login',
            template: "KKalmighty"
        })
        .state('index', {
            url: '/index',
            templateUrl: 'modules/core/client/views/login/index.client.tpl.html'
        });
});
