/**
 * Created by yididiya on 7/11/2016.
 */
(function () {
    'use strict';

    var AnwaniAppSecurity =  angular.module('BlurAdmin.pages.security', ['ngCookies']);

    AnwaniAppSecurity.constant('SECURITY_EVENTS', {
        LoginSuccess: 'LoginSuccess',
        LoginFailed: 'LoginFailed',
        LogoutSuccess: 'LogoutSuccess',
        SessionTimeout: 'SessionTimeout',
        NotAuthorized: 'NotAuthorized',
        NotAuthenticated: 'NotAuthenticated'
    });


    AnwaniAppSecurity.config(routeConfig);
    /** @ngInject */
    function routeConfig($stateProvider,$httpProvider) {
        $stateProvider

            .state('signup', {
                url: '/signup',
                templateUrl: 'app/pages/security/signup.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/security/login.tmpl.html'
            });
    }

})();

