/**
 * Created by n.poltoratsky
 * on 24.06.2016.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.address')
        .controller('NewAddressModalCtrl', NewAddressModalCtrl);

    function NewAddressModalCtrl($scope,$uibModal, baProgressModal,$rootScope,loggerService) {
        var vm = this;

        vm.saveAddress = saveAddress;

        function saveAddress(){
            $rootScope.modalInstance.close();
            loggerService.showSuccess("Success", 'You have successfuly added new address', 'Successfuly added!');
        }
    }

})();
