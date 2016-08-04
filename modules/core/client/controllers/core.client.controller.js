
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
        .service('httpService', ['$http', function ($http) {

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
        .controller('mainCtrl', function($scope){
            $scope.hi = function(){
                console.log("HI");
            }

        }).controller('Ctrl1', function($scope){


    })
    .controller('ContactsCtrl', function($scope, httpService, $http){

        httpService.displayData()
            .success(function(data) {
            cont = data;
            $scope.fields = Object.keys($scope.contactSample[0]) || [];
            $scope.contacts = cont;
            })
            .error(function(data) {
                console.log(data);
            });

        $scope.contactSample = [
            {
                Ciudad: "Hyderabad",
                Teléfono : "234-657-9673",
                Dirección: "1150 Oruoju Grove",
                Zip: "96363",
                Correo_Electronico: "posawle@si.ac",
                Apellido: "Arnold",
                Nombre: "Ethan",
                Borrar : "xyz",
                Editar: "abc"
            }
        ];
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
            this.showButton = false;
            httpService.updateData(contact)
                .success(function(data){
                    console.log("Felicidades! Contact Updated!!");
                })
                .error(function(data){
                    console.log("Couldn't update the Contact!");
                });
        }
    })
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
    });

