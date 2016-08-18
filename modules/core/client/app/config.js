'use strict';

var ApplicationConfiguration  = (function(){

    var _applicationModuleName = 'ContactsApp',
        _applicationDependencies = ['ui.router'],
        _loginModuleName = 'login',
        _loginDependencies = ['ui-router'];

    var _registerModule = function(moduleName, dependencies){
        // create angular module
        angular.module(moduleName, dependencies || []);
        angular.module(_applicationModuleName).requires.push(moduleName);
    }

    return {
        applicationModuleName: _applicationModuleName,
        applicationDependencies: _applicationDependencies,
        loginModuleName: _loginModuleName,
        loginDependencies: _loginDependencies,
        registerModule: _registerModule
    }

})();
