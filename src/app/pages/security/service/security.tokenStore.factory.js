/**
 * Created by Yididiya on 7/11/2016.
 */
(function () {
    "use strict";

    angular.module('BlurAdmin.pages.security').factory('tokenStoreService', tokenStoreService);

    tokenStoreService.$inject = ['$window', '$cookieStore'];

    function tokenStoreService($window, $cookieStore) {

        var store = $window.localStorage;


        return {
            getToken: getToken,
            setToken: setToken,
            clearToken: clearToken
        };

        function getToken() {
            return store.getItem(SETTINGS.app_key);
        }

        function setToken(token) {
            if (token != null) {
                store.setItem(SETTINGS.app_key, token);
            }
        }

        function clearToken() {
            store.removeItem(SETTINGS.app_key);
            $cookieStore.remove(SETTINGS.app_key);
        }
    }


})();