'use strict';

var mongoose = require('mongoose'),
    contact = mongoose.model('KK'),
    Chance = require('chance');


module.exports.getContacts = function(callback) {

    contact.find({},function (err, contacts) {
        if(err) callback(err);
        else callback(null, contacts);
    });

}


module.exports.findById = function(id, callback){

    contact.findOne({'_id': id}, function(err, contacts) {
        if(err) {
            callback(err);
        }
        //console.log("Find by id: "+contacts);
        callback(null, contacts);
    });

}


module.exports.saveContact = function(savableContact, callback) {

    //console.log(savableContact);
    var cont = new contact(savableContact);
    cont.save(function(err){
        if(err){
            callback(err);
            return ;
        }
        callback(null, cont);
    });
    console.log('Mongoose Ready State: '+mongoose.connection.readyState);

}


module.exports.updateContact = function (contactID, updatedContact, callback) {

    contact.findByIdAndUpdate(contactID,
        {
            firstName: updatedContact.firstName,
            lastName: updatedContact.lastName,
            email: updatedContact.email,
            zip: updatedContact.zip,
            address: updatedContact.address,
            phone: updatedContact.phone,
            city: updatedContact.city,
            _id: contactID
        }, function(err, contact) {
        if(err) {
            callback(err);
            return ;
        }
        callback(null, contact);
    });

}


module.exports.searchContactByCity = function(city, callback){


    contact.find({city: city}, {_id:0, firstName:1, phone:1, city:1}, function(err, contacts){
       if(err) callback(err);
        else callback(null, contacts);
    });

}


module.exports.searchContactByNum = function(num, callback) {

    var newObj, mobile = num.substr(0,3);
    mobile = mobile.concat('.*');
    contact.find({phone: {$regex: mobile}}, function(err, contacts){
        if(err) callback(err);
        else callback(null, contacts);

    });
}

module.exports.deleteContactByID = function(id, callback){

    contact.findByIdAndRemove(id, function(err){
        if(err){
            callback(err)
        } else callback(null);
    });

}

module.exports.getTopTen = function(parameter, callback){

    contact.find({}).limit(10).sort(parameter).exec(function (err,contacts) {
        if(err){
            callback(err);
        }else{
            console.log(contacts);
            callback(null,contacts);
        }
    });

}

module.exports.populateDb =  function(con, callback) {

    con.forEach(function(element) {
        var cont = new contact(element);
        cont.save(function(err){
            if (err) callback(err);
            else callback(null);
        });
    });

}

module.exports.populateDatabase = function(callback) {


    function generateContacts() {

        var chance = new Chance();
        var contacts = [];

        for (var i = 0; i < 1; i++) {
            var contact = {};
            var name = chance.name().split(' ');
            contact.firstName = name[0];
            contact.lastName = name[1];
            contact.zip = chance.zip();
            contact.email = chance.email();
            contact.address = chance.address();
            var fone = chance.phone().replace('(', '').replace(')', '').replace(' ', '-');
            contact.phone = fone;
            contact.city = chance.city();

            contacts.push(contact);
        }
        return contacts;

    }
    var contactArray = generateContacts();

    this.populateDb(contactArray, function(err){
        if (err) callback(err);
        else callback(null);
    });

}

