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

    console.log(savableContact);
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

/*module.exports.getContactByID = function(id, callback) {

    contact.findOne({ '_id': id }, function (err, cont) {
        if (err) throw err;
        console.log('%s %s lives in %s.', cont.firstName, cont.lastName, cont.address, cont.email, cont.zip);
        var obj = {
            firstName: cont.firstName,
            lastName: cont.lastName,
            email: cont.email,
            zip: cont.zip,
            address: cont.address,
            _id: cont._id

        }

        callback && callback(null, obj);

    });
}*/

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

module.exports.deleteContactByID = function(id, callback){

    contact.findByIdAndRemove(id, function(err){
        if(err){
            callback(err)
        } else callback(null);
    });
}