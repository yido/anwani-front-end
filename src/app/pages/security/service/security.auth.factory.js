/**
 * Created by yididiya on 7/11/2016.
 */
(function () {

    angular.module('BlurAdmin.pages.security').factory('authService', authService);

    authService.$inject = ['$http',
        '$q',
        'tokenStoreService',
        "$rootScope",
        'LocalStoreService',
        "$cookieStore",
        "$window",
        'APIService'];

    function authService($http,
                         $q,
                         tokenStoreService,
                         $rootScope,
                         LocalStoreService,
                         $cookies,
                         $window,
                         APIService ) {
        var APP_SETTINGS = SETTINGS;
        var store = $window.localStorage;
        return {
            login: login,
            signup: signup,
            logout: logout,
            lock: lock,
            loadUserInfo: getUserInfo,
            loadMenus: loadMenus,
            isSessionValid: isLoggedIn,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            clearSession: clearSession,
            returnUrl: returnUrl,
            setReturnUrl: setReturnUrl
        };

        function login(username, password) {

            var deferred = $q.defer();

            var credentialData = "grant_type=password&username=" + username + "&password=" + password;
            $http.post(APP_SETTINGS.app_token_url+API.Users.POST.Login,
                credentialData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function (response) {
                    console.log('on case of success',response);
                    LocalStoreService.setItem(SETTINGS.app_salt, response.token);
                    tokenStoreService.setToken(response.token);
                    var session = {
                        LoggedInUser: {
                            FirstName: response.user.profile.first_name,
                            MiddleName: response.user.profile.middle_name,
                            LastName: response.user.profile.last_name,
                            UserType: response.user_type,
                            Username: response.user.username,
                            UserId: response.user._id,
                            ProfileId: response.user.profile._id
                        },
                        User:response.user,
                        IsScreenLocked: false
                    };

                    LocalStoreService.setItem('Session', session);
                    $rootScope.LoggedInUser = session.LoggedInUser;


                    response.FirstName = response.user.profile.first_name;
                    response.MiddleName = response.user.profile.middle_name;
                    response.LastName = response.user.profile.last_name;
                    deferred.resolve(response);

                }).error(function (response) {
                console.log('on case of error',response);
                deferred.reject(response);
            });
            return deferred.promise;
        }
        function signup(user) {

            var deferred = $q.defer();
            $http.post(APP_SETTINGS.app_token_url+API.Users.POST.SignUp,
                user, {headers: {'Content-Type': 'application/json'}})
                .success(function (response) {

                    response.username = response.username;
                    response.FirstName = response.profile.first_name;
                    response.MiddleName = response.profile.middle_name;
                    response.LastName = response.profile.last_name;
                    deferred.resolve(response);

                }).error(function (response) {
                console.log('on case of error',response);
                deferred.reject(response);
            });
            return deferred.promise;
        }

        function logout() {
            var key = "Session";
            LocalStoreService.removeItem(SETTINGS.app_salt);
            LocalStoreService.removeItem(key);
            tokenStoreService.clearToken();
        }

        function lock() {
            return $http.post(APP_SETTINGS.api_url + '/v1/auth/lock');
        }

        function getUserInfo() {
            var ds = "this is from user info action"
            return ds;
        }
        function loadMenus() {

        var key = "Menu";
        var deferred = $q.defer();

        var menus = LocalStoreService.getItem(key);
        if (menus == null || menus.length == 0) {
            getMenuFromService(key, deferred);
        }
        else {
            deferred.resolve(menus);
        }
        return deferred.promise;
        }

        function getMenuFromService(key,defPromise) {
           APIService.Get(API.Account.GET.Menus,{}).then(function(response){
                LocalStoreService.setItem(key, response);

                defPromise.resolve(response);
            }, function (response) {
                defPromise.reject(response);
            });
        }
        function isLoggedIn() {
            var cookie = LocalStoreService.getItem(SETTINGS.app_salt);
            if(cookie !=null) loadUserInfo();
            return cookie != null;// && cookie===t1;
        }
        function loadUserInfo(){
            var session =  LocalStoreService.getItem('Session');
            if(session !=null){
                console.log('on refresh ur session is session',session);
                $rootScope.LoggedInUser = session.LoggedInUser;
            }
        }
        function forgotPassword(username) {
            var deferred = $q.defer();
            $http.post(APP_SETTINGS.api_url + '/v1/auth/ForgotPassword?username=' + username).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        function resetPassword(resetInfo) {
            return $http.post(APP_SETTINGS.api_url + '/v1/auth/ResetPassword?t=' + resetInfo.token + '&p=' + resetInfo.password);
        }

        function clearSession() {
            LocalStoreService.removeItem(APP_SETTINGS.app_key);
            LocalStoreService.removeItem(APP_SETTINGS.app_salt);
            console.log("Session Cleared", "Auth Service");
        }

        function setReturnUrl(returnUrl) {
            if (returnUrl != null) {
                LocalStoreService.setItem("returnUrl", returnUrl.name);
            }

        }

        function returnUrl() {
            return LocalStoreService.getItem("returnUrl");
        }

    }
})();