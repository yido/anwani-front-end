/**
 * Created by yididiya on 7/11/2016.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.security').factory('loggerService', loggerService);


    function loggerService(toastr, toastrConfig) {
        init();
        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success,
            errorHandler: errorHandler
        };

        function error(message, title) {
             toastr.error(message, title);
        }

        function info(message, title) {
            toastr.info(message, title);
        }

        function warning(message, title) {
            toastr.warning(message, title);
        }

        function success(message, title) {
            toastr.success(message, title);
        }

        function errorHandler(response) {
            if (response.data == null) return;
            error(response.data.Message + ' ' + response.data.ExceptionMessage, "Error");
        }

        function init() {
            // toastr.options.timeOut = 2000;
            // toastr.options.fadeOut = 650;
            // toastr.options.fadeIn = 250;
        }
    }
})();