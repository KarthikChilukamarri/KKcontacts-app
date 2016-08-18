'use strict';

module.exports.index = function(req, res) {
    
    if( req.session.userId != null)
        res.render('index');
    else
        res.render('login');
}
