'use strict';

AnwaniApp = angular.module('BlurAdmin', [
  'ngAnimate',
  'ngResource',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
],
    [
      '$httpProvider', function($httpProvider) {
      // $httpProvider.defaults.withCredentials = true; // don't enable this line for the time being!
      $httpProvider.defaults.xsrfCookieName = "anwani_eth";
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.interceptors.push('authInterceptorService');
    }]);

// AnwaniApp.config(function ($httpProvider) {
//   $httpProvider.defaults.useXDomain = true;
//   $httpProvider.interceptors.push('authInterceptorService');
// });

// '$httpProvider', function($httpProvider) {
//   // $httpProvider.defaults.withCredentials = true; // don't enable this line for the time being!
//   $httpProvider.defaults.xsrfCookieName = "orbit_health_ehr_eth";
//   $httpProvider.defaults.useXDomain = true;
//   $httpProvider.interceptors.push('authInterceptorService');
// }
/* Init global settings and run the app */
AnwaniApp.run(["$rootScope", "$state","$location","authService","SECURITY_EVENTS",
  function($rootScope,  $state,$location,authService,SECURITY_EVENTS) {
    $rootScope.$state = $state; // state to be accessed from view
    console.log('$rootScope.$state',$rootScope.$state);
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState){

      if(!authService.isSessionValid()){
        if(toState.name !="login" && toState.name != 'signup'){
          authService.setReturnUrl(toState);
          $rootScope.$broadcast(SECURITY_EVENTS.NotAuthenticated);
        }
      }

      if(toState.name != 'lockscreen'){ //(!requireLogin && toState.name != 'lockscreen')
        //~ Clear Saved Username from Local Storage ~//
      }

      //~ rootScope Control Variables ~//
      $rootScope.isLoginPage = (toState.name == 'login' || toState.name == 'signup');
      $rootScope.isLockscreenPage = (toState.name == 'lockscreen');
    });

    $rootScope.$on('$routeChangeSuccess',
        function(event) {
          //if (!$window.ga || !window.appSettings || window.appSettings.api_url !== 'http://api.orbit.co') {
          //    return;
          //}
          //$window.ga('send', 'pageview', {
          //    page: $location.path()
          //});
        });
  }]);
