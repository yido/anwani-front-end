/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.address')
        .controller('SearchAddressPageCtrl', SearchAddressPageCtrl);

    /** @ngInject */
    function SearchAddressPageCtrl($scope, $uibModal, $timeout, addressDataFactory, $rootScope, loggerService) {

        var page = 'app/pages/address/search/share-address-modal.html', size = 'md';
        $scope.Addresses = [];
        $scope.showSearchForm = false;
        $scope.users = [];
        $scope.selectedUser = null;

        addressDataFactory.getAddressForUser($rootScope.LoggedInUser.UserId).then(function (data) {
            $scope.Addresses = data;
        });


        $scope.userSelected = function(userSelected){
            $scope.selectedUser = userSelected;
        }
        $scope.share = function (item) {
            $scope.address = item;
            $scope.showSearchForm = true;
        }

        $scope.shareAddress = function () {
            console.log('selected user new wanaw',$scope.selectedUser);
            // $scope.showSearchForm = false;
            // loggerService.showSuccess("Success", 'You have successfuly shred your address',
            //     'Successfuly shred!');

            addressDataFactory.shareAddressForUser($scope.address._id,
                $scope.selectedUser._id,
                function (success) {
                  $scope.showSearchForm = false;
                  loggerService.showSuccess("Success", 'You have successfuly shred your address',
                      'Successfuly shred!');

                    console.log('success sdsd',success);
                }, function (error) {
                  console.log(error);
                  loggerService.showError("Sorry, Address sharing failed! " + error.message, "Sharing Info");
                });
        }


        $scope.refreshUsers = function (userQuery) {
            if(userQuery.length == 0) return [];
            addressDataFactory.searchForUser(userQuery).then(function (data) {
                $scope.users = data;
            });


        };


    }
})();
