'use strict';

var mongoose = require('mongoose'),
    contact = mongoose.model('KK');


module.exports.getContacts = function(callback) {

    contact.find({},function (err, contacts) {
        if(err)
        callback(err);
        //console.log(contacts);
        callback(contacts);
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

/*module.exports.searchContacts = function(search, display, callback){

    for(var prop in search){
        if(search[prop] == ''){
            search[prop] = '{$regex: /^408/}';
        }
    }
    console.log(search.firstName);
    console.log(search.city);

    contact.find(
        {
        firstName: search.firstName,
        lastName: search.lastName,
        city: search.city,
        phone: search.phone,
        zip: search.zip,
        email: search.email,
        address: search.address,
        _id: search._id
        }, {
            city: parseInt(display[0]),
            phone: parseInt(display[1]),
            address: parseInt(display[2]),
            zip: parseInt(display[3]),
            email: parseInt(display[4]),
            lastName: parseInt(display[5]),
            firstName: parseInt(display[6]),
            _id: parseInt(display[7])
        }, function(err, contacts){
        if(err) {
            console.log(err);
            callback(err);
        }
        else {
            console.log(contacts);
            callback(null, contacts);
        }
    });
    
}*/

/*module.exports.searchContacts1 = function(callback){
    contact.find({city: "SAN JOSE"},{firstName:1, phone:1, _id:0}, function(err, contacts){

        if(err){
            callback(err);
        } else{
            callback(null, contacts);
        }
    });
}

module.exports.searchContacts2 = function(callback){
    contact.find({phone: {$regex: /^408/}}, function(err, contacts){

        if(err){
            callback(err);
        } else{
            callback(null, contacts);
        }
    });
}*/


module.exports.findContactByCity = function(city, callback){

    var newObj,
        foundContacts = [];
    contact.find({}).where('city').eq(city).exec(function (err,contacts) {
        for(var i=0; i< contacts.length; i++) {
            newObj = {firstName: contacts[i].firstName, phone: contacts[i].phone, city: contacts[i].city};
            foundContacts.push(newObj);
        };
        if(err){
            callback(err);
        } else {
            console.log(contacts);

                callback(null, foundContacts);
            }
    });
}


module.exports.findContactByNum = function(num, callback) {

    var newObj, mobile = num.substr(0,3),
        foundContacts =[];
    mobile = mobile.concat('.*');
    console.log(mobile);
    contact.find({phone: {$regex: mobile}}).exec(function (err, contacts) {
        if(err){
            callback(err);
        } else {
            console.log(contacts);
            for(var i=0; i< contacts.length; i++){
                newObj = {
                    firstName:contacts[i].firstName,
                    lastName: contacts[i].lastName,
                    phone: contacts[i].phone,
                    address: contacts[i].zip,
                    city: contacts[i].city,
                    email: contacts[i].email,
                    _id: contacts[i]._id
                };
                foundContacts.push(newObj);
            };
            callback(null,foundContacts);
        }
    });
}

module.exports.deleteContactByID = function(id, callback){

    contact.findByIdAndRemove(id, function(err){
        if(err){
            callback(err)
        } else callback(null);
    });

}
