/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.address', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('address', {
          url: '/address',
          templateUrl: 'app/pages/address/address.html',
          abstract: true,
          title: 'Address',
          sidebarMeta: {
            icon: 'ion-ios-location-outline',
            order: 500,
          },
        })
        .state('address.myaddress', {
            url: '/my-address',
            templateUrl: 'app/pages/address/my-address/my-address.html',
            controller: 'MyAddressPageCtrl',
            title: 'My Address',
            sidebarMeta: {
                order: 0,
            },
        })
        .state('address.share', {
            url: '/share-address',
            templateUrl: 'app/pages/address/share-address/share-address.html',
            controller: 'ShareAddressPageCtrl',
            title: 'Shared Address',
            sidebarMeta: {
                order: 100,
            },
        })
        .state('address.search', {
            url: '/search',
            templateUrl: 'app/pages/address/search/search.html',
            controller: 'SearchAddressPageCtrl',
            title: 'Share',
            sidebarMeta: {
                order: 200,
            },
        });
  }

})();
