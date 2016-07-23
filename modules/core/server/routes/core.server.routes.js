'use strict';


module.exports = function (app) {

    var controller =  require('../controllers/core.server.controller.js');

    app
        .route('/api/contact')
        .get(controller.getContacts)
        .post(controller.createContact);

    /*app
        .route('/api/contact/:id')
        .post(controller.searchContacts);

    app
        .route('/api/contact/search1')
        .get(controller.searchContacts1);
    app
        .route('/api/contact/search2')
        .get(controller.searchContacts2);*/


    app
        .route('/api/contact/:id')
        .put(controller.updateContact)
        .get(controller.getContactById)
        .delete(controller.deleteContactById, controller.getContacts);


    app
        .param('id',controller.validateContactIdAndForward);

    app
        .route('/api/city/:city')
        .get(controller.searchContactByCity);

    app
        .route('/api/number/:num')
        .get(controller.searchContactByNum);
    
}
