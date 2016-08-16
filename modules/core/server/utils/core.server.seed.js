'use strict';
var Chance = require('chance'),
    mongoose = require('mongoose'),
    contact = mongoose.model('KK');

module.exports.populateDb =  function(con, callback) {
    var error;
    con.forEach(function(element) {
        var cont = new contact(element);
        cont.save(function(err){
            if(err){
                error = err;
                return;
            }
        });

    });

    if(error) callback(err);
    else callback(null);
}

module.exports.populateDatabase = function(callback) {


    function generateContacts() {

        var chance = new Chance();
        var contacts = [];
        var ArrayUtils = new Array(50);
        for(var i=0; i<50; i++){
          ArrayUtils.push(i);
        };

        ArrayUtils.forEach(function(){

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
        });

        return contacts;

    }
    var contactArray = generateContacts();

    contact.remove({}, function(err){
        if(err) callback(err);
        else return;
    });

    this.populateDb(contactArray, function(err){
        if (err) callback(err);
        else return;
    });
}
