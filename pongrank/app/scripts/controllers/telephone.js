'use strict';
angular.module('pongrankAppTelephone', [])
  .controller('TelephoneCtrl', function ($scope, $http) {

    $scope.addTelephone = function (body) {
      $http.post('/api/addTelephone/?name=' + $scope.currentUser.name + '&body=' + $scope.user.telephone)
      .success(function(user) {
          console.log('number added successfully!');
          window.location = '/';
        });
    };
  });