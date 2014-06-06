'use strict';

// var app =angular.module('pongrankApp')
//   app.controller('MainCtrl', function ($scope, $http, $rootScope) {
//     $http.get('/api/awesomeUsers').success(function(awesomeUsers) {
//       $scope.awesomeUsers = awesomeUsers;
//     });
//     if (!!$rootScope.currentUser) {
//         $http.get('/api/findCurrent/?name=' + $rootScope.currentUser.name)
//           .success(function(user) {
//               $rootScope.currentUser = user;
//           }
//     );

var app = angular.module('pongrankApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope){
    $http.get('/api/awesomeUsers')
    .success(function(awesomeUsers){
      $scope.awesomeUsers = awesomeUsers;
    });
    if (!!$rootScope.currentUser) {
      $http.get('/api/findCurrent/?name=' + $rootScope.currentUser.name)
      .success(function(user){
        $rootScope.currentUser = user;
      });
    }
  });