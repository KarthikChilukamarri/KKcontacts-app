
'use strict';

/*angular.module('ContactsApp')
    .controller('ContactsCtrl', function($scope, ContactService){

        var contactsPromise = ContactService.getContacts();
        var successCallback = function(response){
            $scope.contacts = response;
            $scope.fields = Object.keys($scope.contacts[0] || []);
        }

        var failureCallback = function(err){
            console.log("Error while fetching the Data");
        }

        contactsPromise
            .success(successCallback)
            .error(failureCallback);

    });*/
    var cont;
    var savedContact;

    angular
    .module('ContactsApp')
        .filter('dataFilter', function() {
            return function (contact) {
                var cont = {};
                for(var key in contact){
                    if(key != '_id')
                        cont[key] = contact[key];
                }
                return cont;
            }
        })
        .filter('fieldFilter', function() {
            return function (fields) {
                var cont = {};
                for(var key in fields) {
                    if (fields[key] != '_id') {
                    var reg = fields[key]
                        // insert a space before all caps
                            .replace(/([A-Z])/g, ' $1')
                            // uppercase the first character
                            .replace(/^./, function(str){ return str.toUpperCase(); })
                    cont[key] = reg;
                    }
                }
                return cont;
            }
        })
        /*.service('httpService', ['$http', function ($http) {

            var urlBase = '/api/contact';

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

        }])
*/
        
    .controller('ContactsCtrl', ['$scope', 'httpService', '$state', function($scope, httpService, $state){

        httpService.displayData()
            .success(function(data) {
                $scope.contacts = data;
                $scope.fields = Object.keys($scope.contacts[0]) || [];
            })
            .error(function(data) {
                console.log(data);
            });

        $scope.del = function(contact) {
            httpService.deleteData(contact)
                .success(function(data){
                    cont = data;
                    $scope.contacts = cont;
                    console.log("Felicidades! Contact Deleted!!");
                })
                .error(function(data){
                    console.log("Couldn't delete the Contact!");
                });
        }
        
        $scope.update = function(contact) {
            console.log("Update Funtion"+contact._id);
            /*var result = {
                contactId : function($stateParams) {
                    return $stateParams.contactId
                }
                };*/
            $state.go('edit', contact._id);
        }
    }])
    .controller('saveCtrl', function($scope, httpService, $http){

        $scope.saveContact = function(contact){
            httpService.saveData(contact)
                .success(function(data) {
                    for(var p in contact) {
                        if (contact.hasOwnProperty(p))
                            contact[p] = '';
                    }
                    console.log("Felicidades! Contact Saved!!");
                })
                .error(function(err) {
                    console.log('Error:' + err);
                });
        }
    })
        .controller('editCtrl', ['$scope', 'httpService', function($scope, httpService, id){
            console.log(contactId);
            httpService.getData(contactId)
                .success(function(data){
                    console.log(data);
                    $scope.contact = data;
                }).error(function(err){
                console.log("Error while fetching Data!!");
            });

            $scope.saveContact = function(contact) {
                httpService.updateData(contact)
                    .success(function(data){
                        console.log(data);
                    }).error(function(err){
                    console.log("Error while fetching Data!");
                })

            }

        }]);


