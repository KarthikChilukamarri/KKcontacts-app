'use strict';
var cont;
var savedContact;


angular
    .module('ContactsApp')
    .controller('ContactsCtrl', function($scope, $http){
        $http.get('/api/contact')
            .success(function(data) {
                cont = data;
                console.log(data);
            })
            .error(function(data) {
                console.log(data);
            });

        $scope.contactSample = [
            {
                Identificación: "510dc9a7-97d9-5131-9456-f339ac85bfb7",
                //_v: 0,
                Ciudad: "Hyderabad",
                Teléfono : "234-657-9673",
                Dirección: "1150 Oruoju Grove",
                Código_Postal: "96363",
                Correo_Electronico: "posawle@si.ac",
                Apellido: "Arnold",
                Primer_Nombre: "Ethan"
            }
        ];

        $scope.fields = Object.keys($scope.contactSample[0]) || [];
        $scope.contacts = cont;

    })
    .controller('saveCtrl', function($scope, $http){
        $scope.saveContact = function(contact){
            $http.post('/api/contact', contact)
                .success(function(data) {
                    savedContact = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

        }

        $scope.fields = savedContact;
    })
    .controller('updateCtrl', function($scope, $http){
        
        $scope.getContact = function(id){
            $http.get('/api/contact/'+id /*{params:{id: id}, contentType:"application/x-www-form-urlencoded" }*/)
                .success(function(data) {
                    console.log(data);
                    $scope.contact = data;

                })
                .error(function(data){
                    console.log('Error: '+data);
                })

        }

        $scope.updateContact = function(contact) {
            $http.put('/api/contact/'+contact._id, contact)
                .success(function(data){
                    console.log(data);
                })
                .error(function(data){
                    console.log(data);
                })

        }

        
    })
    .controller('deleteCtrl', function($scope, $http){

        $scope.deleteContact = function(id){

            $http.delete('/api/contact/'+id)
                .success(function(data){
                    console.log(data);
            })
                .error(function(data){
                console.log(data);
            })
        }
    });