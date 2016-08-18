
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
            $state.go('edit', {contactId: contact._id});
        }
    }])
    .controller('saveCtrl', ['$scope','$state', 'httpService', function($scope, $state, httpService){

        $scope.saveContact = function(contact){
            httpService.saveData(contact)
                .success(function(data) {
                    for(var p in contact) {
                        if (contact.hasOwnProperty(p))
                            contact[p] = '';
                    }
                    console.log("Felicidades! Contact Saved!!");
                    $state.go('display');
                })
                .error(function(err) {
                    console.log('Error:' + err);
                }
            )}
    }])
        .controller('editCtrl', ['$scope', 'httpService', '$stateParams', '$state', function($scope, httpService, $stateParams, $state){
            var contactId = $stateParams.contactId;
            httpService.getData(contactId)
                .success(function(data){
                    $scope.contact = data;
                }).error(function(err){
                console.log("Error while fetching Data!!");
            });

            $scope.saveContact = function(contact) {
                httpService.updateData(contact)
                    .success(function(data){
                        for(var p in contact) {
                            if (contact.hasOwnProperty(p))
                                contact[p] = '';
                        }
                        console.log("Felicidades! Contact Updated!!");
                        $state.go('display');
                    }).error(function(err){
                    console.log("Error while fetching Data!");
                })

            }

        }])
        .controller('logoutCtrl', ['$scope', 'login', 'httpService', '$state', function($scope, login, httpService, $state){

            httpService.logout()
                .success(function(data){
                console.log(data);
                    $state.go('loghome');
            })
                .error(function(err){
                    console.log(err);
                })

        }]);


