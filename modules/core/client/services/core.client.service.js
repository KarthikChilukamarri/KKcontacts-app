'use strict';

/*
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

    });*/

angular.
    module('ContactsApp')
        .service('httpService', ['$http', function ($http) {

            var urlBase = '/api/contact';
            this.getData = function(contactId) {
                return $http.get(urlBase+'/'+contactId);
            };
            this.displayData = function () {
                return $http.get(urlBase);
            };

            this.saveData = function (contact) {
                return $http.post(urlBase, contact);
            };

            this.deleteData = function (contact) {
                return $http.delete(urlBase+'/'+contact._id);
            };

            this.updateData = function(contact) {
                return $http.put(urlBase + '/' +contact._id, contact);
            };
            this.logout = function(){
                return $http.get('/api/logout');
            };

    }]);
