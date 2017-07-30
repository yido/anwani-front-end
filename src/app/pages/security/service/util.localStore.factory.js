/**
 * Created by yididiya on 7/11/2016.
 */
(function () {
    "use strict";

    angular.module('BlurAdmin.pages.security').factory('LocalStoreService', LocalStoreService);

    LocalStoreService.$inject = ['$window','$location'];

    function LocalStoreService($window,$location) {

       var ENCRYPTION_SALT =  "anwani_eth_salt";
        var store = $window.localStorage;
        var keyPrefix = $location.host() == 'localhost' ? 'Offline_AnwaniApp_' : 'Online_AnwaniApp_';

        return {
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem
        };

        function getItem(key) {

            //  var strd = store.getItem(keyPrefix + key);
            // if (!_.isUndefined(strd) && strd !=null) {
            //     var decryptedValue = (CryptoJS.AES.decrypt(strd.toString(), ENCRYPTION_SALT)).toString(CryptoJS.enc.Utf8);
            //     return _.isUndefined(decryptedValue) || decryptedValue == null ? undefined : JSON.parse(decryptedValue);
            // }
            // With out encryption //
           var data = JSON.parse(store.getItem(keyPrefix + key));
         return data;
        }

        function setItem(key, item) {

            if (item != null) {
                var value = (JSON.stringify(item)).toString();
                store.setItem(keyPrefix + key,value );// With out encyrption use this:  //
            } else {
                store.removeItem(keyPrefix + key);
            }
        }

        function removeItem(key) {
            store.removeItem(keyPrefix + key);
        }
    }

})();
