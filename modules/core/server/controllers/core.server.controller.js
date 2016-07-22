'use strict';

var mockService = require('../utils/core.server.mock'),
    contactService = require('../services/contact.server.service');

module.exports.getContactById = function (req, res) {

    var id = req.metadata.contactId;
    //console.log("Get contact by id: "+id);
    contactService.findById(id, function(err, foundContact){
        if(err){
            res
                .status(400)
                .send({message: "Error: Internal error while saving data. Please try again later!!"})
            return ;
        }
        res
            .status(400)
            .json(foundContact);

    });

}

module.exports.getContacts = function(req, res) {

        contactService.getContacts(function (contacts) {
            res
                .status(200)
                .json(contacts);


        });

}

module.exports.deleteContactById = function(req, res, next) {

    var id = req.metadata.contactId;
    contactService.deleteContactByID(id, function(err){
        if(err){
            res
                .status(400)
                .send("ERROR: Could not delete the Object");
            return ;
        }

    });
    next();

}

module.exports.createContact = function (req, res) {

    var contact = req.body;
    contactService.saveContact(contact, function (err, contact) {
        if (err) {
            res
                .status(400)
                .send({message: "Error: Internal error while saving data. Please try again later!!"});
            return ;
        } else
        {
            res
                .status(200)
                .json(contact)
        }
    });

}

module.exports.updateContact = function (req, res) {

    var updatedContact = req.body,
        ID = req.metadata.contactId;

    contactService.updateContact(ID, updatedContact, function (err, contact) {
        if (err) {
            res
                .status(400)
                .send({message: "Error:: Unable to update contact. Please try again!!"});
        } else {
            res
                .status(200)
                .send(contact);
        }
    });

}


module.exports.validateContactIdAndForward = function (req, res, next, id){

    var metadata = req.metadata = {};
    metadata.contactId = id;
    contactService.findById(id, function(err, foundContact){
        if(err){
            res
                .status(400)
                .send({message: "ERROR: Could not find the contact. Please try again later!!"})
            return ;

        }
            metadata.mode = foundContact;

    });
    next();

}