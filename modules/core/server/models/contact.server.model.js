'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');


var validateFieldStrategy = function(property){

    return property.length;
}

var validateEmailStrategy = function(property){

    return validator.isEmail(property);
}

var validateZipStrategy = function(property){

    if(validator.isLength(property, {min:6, max:6})){
        validator.isInt(property);
    } else return false;
}

var validatePhoneStrategy = function(property) {

    return /\d{3}-\d{3}-\d{4}/.test(property);
}



var ContactSchema = new Schema({

    firstName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'FirstName cannot be empty!'],
    },

    lastName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'lastName cannot be empty!']
    },

    email: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmailStrategy, 'Please enter valid email id.']
    },

    zip: {

        type: String,
        default: '',
        trim: true,
        validate: [validateZipStrategy, 'lastName cannot be empty!']

    },

    address: {

        type: String,
        default: '',
        validate: [validateFieldStrategy, "Address cannot be empty!"]
    },

    phone: {
        type: String,
        trim: true,
        unique: true,
        default: '',
        validate: [validatePhoneStrategy, "Phone number is invalid!"]
    },

    city: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "City cannot be empty!"]

    }
    
});

//mongoose.model('Contact', ContactSchema);
mongoose.model('KK', ContactSchema);