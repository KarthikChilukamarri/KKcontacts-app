'use strict';

var mockService = require('../utils/core.server.mock'),
    contactService = require('../services/contact.server.service'),
    mainController = require('./main.server.controller'),
    seed = require('../utils/core.server.seed');

module.exports.getContactById = function (req, res) {

    var id = req.params.id;
    console.log("Get contact by id: "+id);
    contactService.findById(id, function(err, foundContact){
        if(err){
            res
                .status(400)
                .send({message: "Error: Internal error while saving data. Please try again later!!"});
        }
        else {
            console.log(foundContact);
            res
                .status(200)
                .json(foundContact);
        }

    });

}

module.exports.getContacts = function(req, res) {

        contactService.getContacts(function (err, contacts) {
            if(err){
                res
                    .status(400)
                    .send({message: "Could not get the contacts!"});
            }
            else {
                res
                    .status(200)
                    .json(contacts);
            }


        });

}

module.exports.deleteContactById = function(req, res, next) {

    var id = req.metadata.contactId;
    contactService.deleteContactByID(id, function(err, contacts){
        if(err){
            res
                .status(400)
                .send("ERROR: Could not delete the Object");
            //return ;
        }
        else {
            res
                .status(200)
                .json(contacts)
        }

    });
    //next();

}

module.exports.createContact = function (req, res) {

    var contact = req.body;
    contactService.saveContact(contact, function (err) {
        if (err) {
            res
                .status(400)
                .send({message: "Error: Internal error while saving data. Please try again later!!"});
        } else
        {
            res
                .status(200)
                .json("Success")
        }
    });

}

module.exports.updateContact = function (req, res) {

    var updatedContact = req.body,
        ID = req.metadata.contactId;

    contactService.updateContact(ID, updatedContact, function (err, contacts) {
        if (err) {
            res
                .status(400)
                .send({message: "Error:: Unable to update contact. Please try again!!"});
        } else {
            res
                .status(200)
                .send(contacts);
        }
    });

}


module.exports.searchContactByCity = function(req, res){

    var city = req.params.city;
    console.log(city);
    contactService.searchContactByCity(city, function (err, contact) {
        if (err) {
            res.status(400)
                .send({message: "Error:: Unable to find contact. Please try again!!"});
        } else {
            res.status(200)
                .json(contact);
        }
    });
}


module.exports.searchContactByNum = function(req, res) {

    var num = req.params.num;
    contactService.searchContactByNum(num, function (err, contact) {
        if (err) {
            res.status(400)
                .send({message: "Error:: Unable to find contact. Please try again!!"});
        } else {
            res.status(200)
                .json(contact);
        }
    });
}

module.exports.getTopTen = function(req, res){
    
    var param = req.params.parameter;
    contactService.getTopTen(param, function(err, contacts){
        
        if(err) {
            res
                .status(400)
                .send({});
        }
        else{
            res
                .status(200)
                .json(contacts);
        }
        
    })
    
}

module.exports.populateDatabase = function(req, res, next){

    seed.populateDatabase(function(err){
        if(err){
            res
                .status(400)
                .send({message: "ERROR: Could not populate the Database!!"});
        }
        else {
            next();
;        }
    });

}



module.exports.validateContactIdAndForward = function (req, res, next, id){

    var metadata = req.metadata = {};
    metadata.contactId = id;
    contactService.findById(id, function(err, foundContact){
        if(err){
            res
                .status(400)
                .send({message: "ERROR: Could not find the contact. Please try again later!!"});
            return ;

        }
            metadata.mode = foundContact;

    });
    next();

}



