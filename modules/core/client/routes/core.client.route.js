'use strict';

angular
    .module('ContactsApp')
        .config(function($stateProvider){

            $stateProvider
                .state('display',{
                    url:'/display',
                    templateUrl: 'modules/core/client/views/display.client.tpl.html'
                })
                .state('create',{
                    url:'/create',
                    templateUrl: 'modules/core/client/views/create.client.tpl.html'
                })
                .state('home', {
                    url:'/home',
                    templateUrl: 'modules/core/client/views/home.client.tpl.html'
                })
                .state('edit', {
                    url:'/edit/:contactId',
                    templateUrl: 'modules/core/client/views/edit.client.tpl.html',
                    resolve: {
                        contactId : function($stateParams) {
                            return $stateParams.contactId
                        }
                    },

                    controller:'editCtrl'

                })
                .state('logout', {
                    url: '/logout',
                    template: 'Logout',
                    controller: 'logoutCtrl'
                })
        });