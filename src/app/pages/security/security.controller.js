/**
 * Created by yididiya on 7/11/2016.
 */
(function () {

    angular.module('BlurAdmin.pages.security').controller('securityController', securityController);

    securityController.$inject = ['$rootScope', '$scope', '$state', 'authService',
        'SECURITY_EVENTS', '$stateParams', '$location', 'loggerService'];

    function securityController($rootScope, $scope, $state, authService
        , SECURITY_EVENTS, $stateParams, $location, loggerService) {
        var vm = this;
        console.log('security controller has been called....', $state);
        vm.username = $stateParams.email || "";
        vm.password = "";
        vm.login = login;
        vm.signup = signup;
        vm.logout = logout;
        vm.reset = reset;
        vm.keyPress = keyPress;
        vm.goToSignup = goToSignup;

        vm.showResetMessage = false;
        vm.resetMessage = {};


        vm.userTypes = [
            {label: 'Individual', value: 'individual'},
            {label: 'Company', value: 'company'},
            {label: 'Government', value: 'government'}
        ];
        vm.user = {
            selectedUserType: vm.userTypes[0]
        }

        function keyPress($event) {
            if ($event.key === "Enter") {
                login();
            }
        }

        function login() {
            authService.login(vm.username, vm.password).then(function success(resp) {
                    $rootScope.$broadcast(SECURITY_EVENTS.LoginSuccess);

                    loggerService.showSuccess("Success", "Hi " + resp.FirstName + '  '
                        + resp.LastName + ' welcome to Anwani!', 'Successful Login!');

                    var returningUrl = authService.returnUrl();

                    if (returningUrl != null && returningUrl != "") {
                        $state.go(returningUrl);
                    } else {
                        $state.go("dashboard", {});
                    }
                },
                function handleError(data) {
                    if (data == null) {
                        loggerService.showError('Sorry there is login problem!', 'login');
                    } else {
                        loggerService.showError(data.message, 'login');
                    }
                });
        }
        function signup() {
            var user = {
                    first_name : vm.user.first_name,
                    middle_name : vm.user.middle_name,
                    last_name : vm.user.last_name,
                    user_type : vm.user.selectedUserType.value,
                    username : vm.user.username,
                    password : vm.user.password
                }

            authService.signup(user).then(function success(resp) {
                    vm.username = vm.user.username;
                    vm.password = vm.user.password;
                    login();
                },
                function handleError(data) {
                    if (data == null) {
                        loggerService.showError('Sorry there is a problem during signing up!', 'Signing problem!');
                    } else {
                        loggerService.showError(data.message, 'login');
                    }
                });
        }
        function logout() {

            authService.logout();
            $rootScope.$broadcast(SECURITY_EVENTS.LogoutSuccess);
            loggerService.showInfo('Logged out was Successful!, See you soon!', 'Security');
            // $state.go('login', {});
        }
        function goToSignup() {
            $state.go("signup", {});
        };

        function reset() {
            authService.forgotPassword(vm.username).then(function (resp) {
                    loggerService.showSuccess(resp.Message, 'Reset Password');
                    vm.resetMessage = resp;
                    vm.showResetMessage = true;
                },
                function () {
                    loggerService.showError(data.message, 'login');
                    vm.showResetMessage = false;
                }
            );
        }
        $scope.unlock = function () {
            $location.url('/');
        }
    }
})();