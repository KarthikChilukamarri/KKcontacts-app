/*
angular
    .module('ContactsApp')
    .filter('dataFilter', function() {
        return function (contact) {
            var cont = {};
            for(var key in contact){
                if(key != '_id')
                    cont[key] = contact[key];
            }
            return cont;
        }
    })
    .filter('fieldFilter', function() {
        return function (fields) {
            var cont = {};
            for(var key in fields) {
                if (fields[key] != '_id') {
                    var reg = fields[key]
                    // insert a space before all caps
                        .replace(/([A-Z])/g, ' $1')
                        // uppercase the first character
                        .replace(/^./, function(str){ return str.toUpperCase(); })
                    cont[key] = reg;
                }
            }
            return cont;
        }
    });*/
