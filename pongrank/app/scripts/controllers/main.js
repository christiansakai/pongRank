'use strict';

var app =angular.module('pongrankApp')
  app.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeUsers').success(function(awesomeUsers) {
      $scope.awesomeUsers = awesomeUsers;
    });
  });
