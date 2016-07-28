'use strict';

var express = require('./express'),  // it will search within same directory instead of node_modules
    config = require('../config'),
    mongoose = require('./mongoose'),
    path = require('path'),
    seed = require(path.join(process.cwd(),'modules/core/server/utils/core.server.seed'));



module.exports.loadRoutes = function (app) {

    var coreRoute =   require(path.join(process.cwd(),'modules/core/server/routes/core.server.routes'));
    coreRoute(app);

}


// initialize the mongodb
module.exports.start = function () {

    var self =this;

    mongoose.connect(function (db) {
        var app = express.init(); // calls the express init function
        seed.populateDatabase(function(err){
            if(err) console.log('ERROR');
            else console.log('SUCCESS');
        });
        self.loadRoutes(app);
        app.listen(config.app.port,function () {
            console.log("Application is running on port : " + config.app.port);
        });
    })
}