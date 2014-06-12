'use strict';

angular.module('pongrankApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {
      email: "jesus@jesus",
      password: "jesus"
    };
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          window.location = "/";
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });