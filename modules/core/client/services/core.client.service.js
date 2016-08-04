'use strict';

angular
    .module('ContactsApp')
    .factory('ContactService', function($http){

        var _getContacts = function() {
            var promise = $http.get('/api/contact');
            return promise;
        }

        var _postContacts = function() {
            var promise = $http.post('/api/contact')
        }

        return {
            getContacts: _getContacts
        }

    });