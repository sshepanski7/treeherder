'use strict';

treeherder.factory('ThClassifiedFailuresModel', [
    '$http', '$q', 'thUrl',
    function ($http, $q, thUrl) {

        var ThClassifiedFailuresModel = function (data) {
            angular.extend(this, data);
        };

        ThClassifiedFailuresModel.get_url = function () {
            return thUrl.getRootUrl("/classified-failure/");
        };

        ThClassifiedFailuresModel.get = function (id, config) {
            // a static method to retrieve a list of ThClassifiedFailuresModel
            // the timeout configuration parameter is a promise that can be used to abort
            // the ajax request
            config = config || {};
            var timeout = config.timeout || null;
            return $http.get(ThClassifiedFailuresModel.get_url() + id + "/", {
                timeout: timeout
            })
            .then(function (response) {
                return new ThClassifiedFailuresModel(response.data);
            });
        };

        ThClassifiedFailuresModel.get_list = function (config) {
            // a static method to retrieve a list of ThClassifiedFailuresModel
            // the timeout configuration parameter is a promise that can be used to abort
            // the ajax request
            config = config || {};
            var timeout = config.timeout || null;
            return $http.get(ThClassifiedFailuresModel.get_url(), {
                timeout: timeout
            })
            .then(function (response) {
                var item_list = [];
                angular.forEach(response.data.results, function (elem) {
                    item_list.push(new ThClassifiedFailuresModel(elem));
                });
                return item_list;
            });
        };

        ThClassifiedFailuresModel.get_matches = function (id) {
            return $http.get(ThClassifiedFailuresModel.get_url() + id + "/matches/");
        };

        ThClassifiedFailuresModel.create = function (bug_number) {
            return $http.post(ThClassifiedFailuresModel.get_url(),
                              { bug_number: bug_number }
            );
        };

        ThClassifiedFailuresModel.createMany = function (data) {
            if (!data.length) {
                return $q.resolve();
            }
            return $http.post(ThClassifiedFailuresModel.get_url(), data);
        };

        ThClassifiedFailuresModel.prototype.update = function (bug_number) {
            var classified_failure = this;
            classified_failure.bug_number = bug_number;
            return $http.put(ThClassifiedFailuresModel.get_url() + classified_failure.id + "/",
                             { bug_number: bug_number });
        };

        ThClassifiedFailuresModel.updateMany = function (data) {
            if (!data.length) {
                return $q.resolve();
            }
            return $http.put(ThClassifiedFailuresModel.get_url(), data);
        };

        return ThClassifiedFailuresModel;
    }]);
