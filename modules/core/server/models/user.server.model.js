'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});

mongoose.model('KK-Users', UserSchema);