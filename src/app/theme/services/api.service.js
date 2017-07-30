/**
 * Created by Yido on 5/5/2017.
 */

(function () {
    angular.module('BlurAdmin.theme').service('APIService', APIService);

    APIService.$inject = ['$resource', '$http', '$rootScope'];

    var api_config =
    {
        GET_OBJECT: {'get': {method: 'GET', isArray: false, crypt: true}},
        GET: {'get': {method: 'GET', isArray: true, crypt: true}},
        POST: {'post': {method: 'POST', crypt: true}},
        PUT: {'put': {method: 'PUT', crypt: true}},
        PLAIN_POST: {'post': {method: 'POST', params: {charge: true}}},
        DELETE: {'post': {method: 'POST'}}
    };

    function APIService($resource, $http, $rootScope) {
        var buildUrl = function (resourceUrl) {
            return SETTINGS.base_api_url.Offline + resourceUrl;
        };

        var buildParams = function (params) {
            var fullParams = params;
            var globalFilters = angular.copy($rootScope.GlobalFilters);
            if (globalFilters !== undefined) {
                fullParams = angular.extend(globalFilters, params);
            }
            return fullParams;
        };
        return {
            Get: function (api, params) {
                return $resource(buildUrl(api), {}, api_config.GET).get(buildParams(params)).$promise;
            },
            GetJson: function (api, params) {
                return $resource(buildDataPath(api), {}, api_config.GET).get(buildParams(params)).$promise;
            },
            GetObject: function (api, params) {
                return $resource(buildUrl(api), {}, api_config.GET_OBJECT).get(buildParams(params)).$promise;
            },
            Post: function (api) {
                return $resource(buildUrl(api), {}, api_config.POST);
            },
            Put: function (api) {
                return $resource(buildUrl(api), {}, api_config.PUT);
            },
            Remove: function (api, id) {
                return $resource(buildUrl(api + ":id"), {id: '@id'}, api_config.DELETE);
            }
        };
    }
})();

