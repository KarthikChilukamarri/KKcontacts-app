'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('KKUsers'),
    Chance = require('chance'),
    mainServer = require('../controllers/main.server.controller');


module.exports.getUsers = function(callback) {

    user.find({},{__v:0}, function (err, contacts) {
        if(err) callback(err);
        else callback(null, contacts);
    });

}


module.exports.findUserById = function(id, callback){
    console.log(id);
    user.findOne({'_id': id}, {__v:0}, function(err, contact) {
        console.log(contact);
        if(err) callback(err);
        else callback(null, contact);
    });

}


module.exports.saveUser = function(savableUser, callback) {

    //console.log(savableContact);
    var userToBeSaved = new user(savableUser);
    userToBeSaved.save(function(err){
        if(err) callback(err);
        else callback(null);
    });

}


module.exports.updateUser = function (userID, updatedUser, callback) {

    user.findByIdAndUpdate(userID,
        {
            username: updatedUser.username,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            _id: userID
        }, {'new': true}, function(err, users) {
            if(err) {
                callback(err);
            }
            callback(null, users);
        });


}

module.exports.deleteUserByID = function(id, callback){

    user.findByIdAndRemove(id, function(err){
        if(err){
            callback(err)
        } else
            user.find({}, {__v:0}, function(err, users){
                if(err) callback(err);
                else callback(null, users);

            })
    });

}

module.exports.compareUser = function(userInfo, callback){
    var uname = userInfo.uname,
        pass = userInfo.pass;
    console.log(uname+" "+pass);
    user.findOne({$and: [ {'username': uname}, {'password': pass} ]}, function(err, data){
        if(err)
            callback(err);
        else {
            if(data==null)
            callback("error");
            else {
                
                callback(null, data);
            }
        }
    });
}

