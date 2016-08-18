/**
 * Created by Karthik Chilukamarri on 8/10/16.
 */
'use strict';

var mockService = require('../utils/core.server.mock'),
    contactService = require('../services/contact.server.service'),
    mainController = require('./main.server.controller'),
    userService = require('../services/user.server.service');



module.exports.getUserById = function (req, res) {

    var id = req.metadata.userId;
    console.log("Get contact by id: "+id);
    userService.findUserById(id, function(err, foundContact){
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

module.exports.getUsers = function(req, res) {

    userService.getUsers(function (err, contacts) {
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

module.exports.deleteUserById = function(req, res, next) {

    var id = req.metadata.userId;
    userService.deleteUserByID(id, function(err, users){
        if(err){
            res
                .status(400)
                .send("ERROR: Could not delete the Object");
            //return ;
        }
        else {
            res
                .status(200)
                .json(users)
        }

    });
    //next();
}

module.exports.compareUser = function(req, res){
    var user = req.body;
    console.log(user);
    userService.compareUser(user, function(err, data){
        if(err == "error"){
            res
                .status(400)
                .send({message: "Error: Comparing the data!"});
        }
        else {
            req.session.userId = data._id;
            res
                .status(200)
                .json(data);
        }
    })
}

module.exports.logout = function(req, res){
    console.log(req.session.userId);
    req.session.userId = null;
    console.log(req.session.userId);

    res
        .status(200)
        .send({message: "Success"});

}


module.exports.createUser = function (req, res) {

    var user = req.body;
    userService.saveUser(user, function (err) {
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

module.exports.updateUser = function (req, res) {

    var updatedUser = req.body,
        ID = req.metadata.userId;

    userService.updateUser(ID, updatedUser, function (err, users) {
        if (err) {
            res
                .status(400)
                .send({message: "Error:: Unable to update contact. Please try again!!"});
        } else {
            res
                .status(200)
                .send(users);
        }
    });

}


module.exports.validateUserIdAndForward = function (req, res, next, uid){

    var metadata = req.metadata = {};
    metadata.userId = uid;
    console.log(uid);
    userService.findUserById(uid, function(err, foundUser){
        if(err){
            res
                .status(400)
                .send({message: "ERROR: Could not find the contact. Please try again later!!"});
            return ;

        }
        metadata.mode = foundUser;

    });
    next();

}
