/**
 * Created by yididiya on 7/11/2016.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.security').factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$rootScope', '$q', 'tokenStoreService',
        'SECURITY_EVENTS', '$location'];

    function authInterceptorService($rootScope, $q, tokenStoreFactory,
                                    SECURITY_EVENTS, $location) {
        return {
            request: addToken,
            responseError:raiseSecurityEvents
        };

        function addToken(config) {
            var token = tokenStoreFactory.getToken();
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }

        function raiseSecurityEvents(response) {

            if (response.status === 401) {
                $rootScope.$broadcast(SECURITY_EVENTS.NotAuthenticated, response);
                $location.url('/login');

            } else if (response.status === 403) {
                $rootScope.$broadcast(SECURITY_EVENTS.NotAuthorized, response);
            } else {
                 // loggerService.errorHandler(response);
            }

            return $q.reject(response);
        }

    }

})();