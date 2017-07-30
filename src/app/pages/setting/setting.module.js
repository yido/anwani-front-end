/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('setting', {
          url: '/setting',
          templateUrl: 'app/pages/setting/setting.html',
          abstract: true,
          title: 'Settings',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 500,
          },
        })
        .state('setting.myprofile', {
            url: '/my-profile',
            templateUrl: 'app/pages/setting/my-profile/my-profile.html',
            controller: 'MyProfilePageCtrl',
            title: 'My Profile',
            sidebarMeta: {
                icon: 'fa fa-user',
                order: 0,
            },
        });
  }

})();
