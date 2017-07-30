/**
 * Created by Yido on 5/6/2017.
 */
AnwaniApp = angular.module('BlurAdmin.pages')
AnwaniApp.controller('AppController', ['$location','$scope', '$rootScope','SECURITY_EVENTS','loggerService','authService','$state', function($location,$scope, $rootScope,SECURITY_EVENTS,loggerService,authService,$state) {

   console.log('anwani app instantaiated...',$scope);
    if(!authService.isSessionValid()){
        $location.url("/login");
    }else{
        initializeHome();
        // $location.url("/blank"); // for the time being //
    }

    /**                           **|
     *** LISTEN SECURITY EVENTS ***
     */

    $rootScope.$on(SECURITY_EVENTS.LoginSuccess, initializeHome);
    $rootScope.$on(SECURITY_EVENTS.LogoutSuccess, clearUserInfo);
    $rootScope.$on(SECURITY_EVENTS.SessionTimeout, notAuthenticated);
    $rootScope.$on(SECURITY_EVENTS.NotAuthorized, notAuthenticated);
    $rootScope.$on(SECURITY_EVENTS.NotAuthenticated, notAuthenticated);

    function clearUserInfo() {
        authService.logout();
        $location.url("/login");
    }
    function notAuthenticated() {
        loggerService.showWarning('Your session has expired. Please login to continue.',"Session Expired");
        authService.clearSession();
        $location.url("/login");
    }
    function initializeHome() {

        if (!authService.isSessionValid()) return;
        console.log("Login success broadcast received well...");
    }
}]);

AnwaniApp.directive("ngUploadChange",function(){
    return{
        scope:{
            ngUploadChange:"&"
        },
        link:function($scope, $element, $attrs){
            $element.on("change",function(event){
                $scope.ngUploadChange({$event: event})
            })
            $scope.$on("$destroy",function(){
                $element.off();
            });
        }
    }
});