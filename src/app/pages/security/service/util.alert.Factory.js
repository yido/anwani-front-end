/**
 * Created by yididiya on 03/01/2016.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.security').factory('alertService', alertService);

    alertService.$inject = ["$q"];

    function alertService($q) {
        init();

        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success,
            errorHandler: errorHandler,
            showConfirm: showConfirm,
            showConfirmForDelete: showConfirmForDelete
        };

        function error(message, title) {
            swal({title: title, text: message, type: "error", confirmButtonText: "Ok", showCancelButton: false});
        }

        function info(message, title) {
            swal({title: title, text: message, type: "info", confirmButtonText: "Ok"});
        }

        function warning(message, title) {
            swal({title: title, text: message, type: "warning", confirmButtonText: "Ok"});
        }

        function showConfirm(message, title, confirmText, confirmationType, closeOnConfirm) {
            var deferred = $q.defer();
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;

            swal({
                    title: title,
                    text: message,
                    type: confirmationType,
                    showCancelButton: true,
                    confirmButtonColor: "#009688",
                    confirmButtonText: confirmText,
                    closeOnConfirm: closeOnConfirm,
                    showLoaderOnConfirm: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        deferred.resolve(isConfirm);
                    } else {
                        deferred.reject(isConfirm);
                    }
                });

            return deferred.promise;
        }

        function showConfirmForDelete(message, title, confirmText, confirmationType, closeOnConfirm) {
            var deferred = $q.defer();
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;

            swal({
                    title: title,
                    text: message,
                    type: confirmationType,
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmText,
                    closeOnConfirm: closeOnConfirm,
                    showLoaderOnConfirm: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        deferred.resolve(isConfirm);
                    } else {
                        deferred.reject(isConfirm);
                    }
                });

            return deferred.promise;
        }

        function success(message, title) {
            swal({title: title, text: message, type: "success", confirmButtonText: "Ok", showCancelButton: false});
        }

        function errorHandler(response) {
            console.log(response);
            var msg = 'Server was unable to process the request';
            var exMsg = '';

            if (response.data && response.data.Message)
                msg = response.data.Message;

            if (response.ExceptionMessage)
                msg = response.ExceptionMessage;

            if (response.data && response.data.ExceptionMessage)
                exMsg = response.data.ExceptionMessage;

            error(msg + ' ' + exMsg, "Error");
        }


        function init() {
            swal.setDefaults({confirmButtonColor: '#0096884'});
        }
    }

})();