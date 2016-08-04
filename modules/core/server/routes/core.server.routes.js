'use strict';


module.exports = function (app) {

    var controller =  require('../controllers/core.server.controller.js'),
        mainController = require('../controllers/main.server.controller.js');

    app
        .route('/')
        .get(mainController.index);

    app
        .route('/api/contact')
        .get(controller.getContacts)
        .post(controller.createContact);


    app
        .route('/api/contact/:id')
        .put(controller.updateContact)
        .get(controller.getContactById)
        .delete(controller.deleteContactById/*, controller.getContacts*/);


    app
        .param('id',controller.validateContactIdAndForward);

    app
        .route('/api/city/:city')
        .get(controller.searchContactByCity);

    app
        .route('/api/number/:num')
        .get(controller.searchContactByNum);
    
    app
        .route('/api/topTen/:parameter')
        .get(controller.getTopTen);
    
    app
        .route('/api/populate')
        .get(controller.populateDatabase, controller.getContacts);
    
    
}
