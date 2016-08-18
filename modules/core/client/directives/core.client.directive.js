/*
'use strict';

angular
    .module('ContactsApp')
    .value('ContactForm', {
        fields: ['firstName','lastName', 'email' , 'city', 'phone', 'zip', 'address']


    })
    .directive('contactForm', function(ContactForm){
        return {
            restrict: 'E',
            templateUrl: 'modules/core/client/views/contact-form.client.tpl.html',
            scope: false,
            link: function($scope, element, attr){
                $scope.fields = $scope.fields  || ContactForm.fields;
            }
        }
    });*/
