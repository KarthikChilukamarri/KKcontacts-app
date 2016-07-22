'use strict';

var Chance = require('chance'),
    _ = require('lodash');

var contacts = generateMockContacts();


module.exports.saveContact = function(contact){

    var chance = new Chance();
    var ccontact = _.clone(contact);
    ccontact.id = chance.guid();
    contacts.push(ccontact);
    return ccontact;

}


module.exports.findContactById = function(id){

    var foundContact;
    contacts.some(function(contact, index){
        if(contact.id === id){
            foundContact = {}
            foundContact.contact = contact;
            foundContact.index = index;
            return foundContact;
        }
    });
    return foundContact;

}


module.exports.getContacts = contacts;


module.exports.updateContact = function(index, updatedContact){

    contacts[index] = updatedContact;
    return updatedContact;
}


module.exports.getContactById = function(index){

    return contacts[index];
}


module.exports.deleteContact = function(index){

    contacts.splice(index,1);
    return contacts;
}


function generateMockContacts(){

    var chance = new Chance();
    var contacts = [];

    for(var i = 0; i < 10; i++ ){
        var contact = {};
        var name = chance.name().split(' ');
        contact.firstName = name[0];
        contact.lastName = name[1];
        contact.id = chance.guid();
        contact.zip = chance.zip();
        contact.email = chance.email();
        contact.address = chance.address();

        contacts.push(contact);
    }
    return contacts;

}