/**
 * Created by Yido on 5/6/2017.
 */

(function () {
    angular.module("BlurAdmin.pages.address").factory("addressDataFactory", addressDataFactory);

    addressDataFactory.$inject = ["APIService", "$q", "LocalStoreService","$http","tokenStoreService","$resource"];

    function addressDataFactory(APIService, $q,LocalStoreService,$http,tokenStoreService,$resource) {


        return {
            //~ GET Methods ~//
            getAddressForUser: _getAddressForUser,
            searchForUser: _searchForUser,
            getSharedAddressForUser: _getSharedAddressForUser,
            addAddressForUser: _addAddressForUser,
            editAddressForUser: _editAddressForUser,
            shareAddressForUser: _shareAddressForUser,
            removeSharedAddressForUser: _removeSharedAddressForUser
        };

        //~ API Get ~//

        function _getAddressForUser(query) {
             return APIService.Get(API.Address.GET.GetAddressForUser + '/' + query);
        }
        function _searchForUser(query) {
            return APIService.Get(API.Address.GET.SearchForUser + '/' + query);
        }

        function _getSharedAddressForUser(userId) {
            return APIService.Get(API.Address.GET.GetSharedAddressForUser + '/' + userId);
        }

        function _addAddressForUser(address,profileId, success, error) {
            APIService.Post(API.Address.GET.addAddressForUser + '/' + profileId).save(address, success, error);
        }
        function _editAddressForUser(address, success, error) {
            APIService.Post(API.Address.GET.editAddressForUser).save(address, success, error);
        }
        function _shareAddressForUser(addressId,userId, success, error) {
            APIService.Post(API.Address.GET.shareAddressForUser + '/' + addressId + '/' + userId).save({},success, error);
        }
        function _removeSharedAddressForUser(address, success, error) {
            APIService.Post(API.Address.GET.removeSharedAddressForUser + '/' +
                addressId + '/' + userId).save({},success, error);
        }
        function api_post(url,data){
            var deferred = $q.defer();
            $http.post(SETTINGS.api_url + url,
                data, {headers: {'Content-Type': 'application/json'}})
                .success(function (response) {

                    console.log('on case of success',response);
                    deferred.resolve(response);

                }).error(function (response) {
                console.log('on case of error',response);
                deferred.reject(response);
            });
            return deferred.promise;
        }
        function api_get(url,data){

            var deferred = $q.defer();
            $http({
                method : "GET",
                url : SETTINGS.api_url + url
            }).then(function mySucces(response) {
                console.log('on case of success',response);
                deferred.resolve(response);
            }, function myError(response) {
                console.log('on case of error',response);
                deferred.reject(response);
            });

            return deferred.promise;
        }
        function api_req(url,data,type){
            var token = tokenStoreService.getToken();
            return $resource( SETTINGS.api_url + url,
                { }, {
                    query: {
                        method: 'GET',
                        params: { userId: '590de342874ac8204c9ebf12'},
                        isArray: true,
                        /* Note the headers property */
                        headers: { 'Authorization': 'Berear ' + token }
                    }
                }).get({}).$promise;

           return  $resource(SETTINGS.api_url + url, {}, {
                get: {
                    method: 'GET'
                }
            });

            var deferred = $q.defer();
            $resource(SETTINGS.api_url + url, {}, {
                get: {
                    method: 'GET',
                    transformResponse: function(data, headers){
                        response = {}
                        response.data = data;
                        // response.headers = headers();
                        console.log('header',headers);

                        return deferred.resolve(response);;
                    }
                }
            })

            // return $http({
            //     method: 'GET',
            //     url: SETTINGS.api_url + url
            // });
            //
            // var deferred = $q.defer();
            // var token = tokenStoreService.getToken();
            // $http({
            //     method: type,
            //     url:    SETTINGS.api_url + url,
            // }).success(function(response){
            //     console.log('on case of success',response);
            //     deferred.resolve(response);
            // }).error(function(response){
            //     console.log('on case of success',response);
            //     deferred.resolve(response);
            // });

                return deferred.promise;
       }

    }
})();