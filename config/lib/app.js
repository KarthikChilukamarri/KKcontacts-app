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

    var self = this;
    //config.validateEnvironmentVariable();

    mongoose.connect(function (db) {

        var app = express.init(); // calls the express init function
        console.log(app.passport);
        self.refreshDatabase();
        self.loadRoutes(app);
        app.listen(config.app.port,function () {
            console.log("Application is running on port : " + config.app.port);
        });
    });
}

module.exports.refreshDatabase = function() {

    if(config.db.dropCollection) {
        seed.populateDatabase(function(err) {
            if(err) console.log("ERROR");
            else console.log("SUCCESS");
        });
    }
    else console.log("Cannot refresh the Database in this environment.");

}