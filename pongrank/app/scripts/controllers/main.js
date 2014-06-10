'use strict';
//
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
  .controller('MainCtrl', function ($scope, $http, $rootScope, $modal, $log){
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

    $scope.items = ['item1', 'item2', 'item3'];
     $scope.open = function (user) {
      $scope.items.push(user);
    var modalInstance = $modal.open({
      templateUrl: 'partials/notifyModal.html',
      controller: 'ModalInstanceCtrl',
      user: $scope.items.last,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  });