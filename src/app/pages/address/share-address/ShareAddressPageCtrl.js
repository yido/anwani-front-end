/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.address')
      .controller('ShareAddressPageCtrl', ShareAddressPageCtrl);

  /** @ngInject */
  function ShareAddressPageCtrl($scope, $uibModal, baProgressModal,addressDataFactory, $rootScope) {


    var page = 'app/pages/address/my-address/new-address/new-address-modal.html',size = 'md';

    $scope.Addresses = [] ;
    addressDataFactory.getSharedAddressForUser($rootScope.LoggedInUser.UserId).then(function (data) {
      console.log('acuired addresses',data);
      $scope.Addresses = data;
    });

    $scope.edit = function (item) {
      $rootScope.modalInstance =
          $uibModal.open({
            animation: true,
            templateUrl: page,
            controller: function ($uibModal, baProgressModal, $rootScope, loggerService) {
              var vm = this;
              vm.address =  item;
              vm.saveAddress = saveAddress;
              vm.attach = attach;
              vm.hideItems = true;

              function attach(){
                var f = document.getElementById('file').files[0],
                    r = new FileReader();

                r.onloadend = function(e) {
                  var data = e.target.result;
                  vm.address.picture = data;
                }
                r.readAsDataURL(f);
              }

              function saveAddress() {
                console.log('save ready address',vm.address);

                var index = $scope.Addresses.indexOf(vm.address);
                $scope.Addresses.splice(index, 1);
                addressDataFactory.editAddressForUser(vm.address,
                    function (success) {
                      $rootScope.modalInstance.close();
                      $scope.Addresses.push(vm.address);
                      loggerService.showSuccess("Success", 'You have successfuly added new address',
                          'Successfuly added!');
                    }, function (error) {
                      console.log(error);
                      loggerService.showError("Sorry, Address saving failed! " + error.message, "Address Info");
                    });

              }
            },
            controllerAs: 'vm',
            size: size,
            keyboard: false,
            backdrop: "static",
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });
    };

  }

})();
