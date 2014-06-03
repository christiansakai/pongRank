'use strict';

angular.module('pongrankApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
