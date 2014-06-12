'use strict';
angular.module('pongrankAppTelephone', [])
  .controller('TelephoneCtrl', function ($scope, $http) {

    $http.get('/api/checkTelephone/?name=' + $scope.currentUser.name)
      .success(function(check) {
        if (check === "true") {
          window.location = '/';
        } else {
        $scope.loadPage = true;
        }
      });
    $scope.cellPhonePattern = /^[0-9]{10}$/g;
    $scope.addTelephone = function (body) {
      $http.post('/api/addTelephone/?name=' + $scope.currentUser.name + '&body=' + $scope.user.telephone)
      .success(function(user) {
          console.log('number added successfully!');
          window.location = '/';
        });
    };
  });