'use strict';

angular.module('pongrankAppModalInstance', [])
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $routeParams, $modal, $http, items, $location) {

  $scope.opponent = $routeParams.opponent;

  $http.get('/api/findCurrent/?name=' + $routeParams.opponent)
      .success(function(user){
        $scope.opponentFull = user;
      });

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.win = function () {
    $http.post('/api/recordWin/?name=' + $scope.currentUser.name)
    .success(function(user) {

    })
    $http.post('/api/recordOppLoss/?name=' + $scope.opponent)
    .success(function(user) {

    })
    $modalInstance.close($scope.selected.item);
    window.location = "/";
  };

$scope.loss = function () {
    $http.post('/api/recordLoss/?name=' + $scope.currentUser.name)
    .success(function(user) {

    })
    $http.post('/api/recordOppWin/?name=' + $scope.opponent)
    .success(function(user) {

    })
    $modalInstance.close($scope.selected.item);
    window.location = "/";
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
    window.location = '/';
  };

  $scope.text = function (body) {
    $scope.opponent = $routeParams.opponent;
    $http.get('/api/findCurrent/?name=' + $routeParams.opponent)
        .success(function(user){
          $scope.opponentFull = user;
          $http.get('/api/sendText/?number=' + $scope.opponentFull.telephone + '&body=' + body)
                .success(function(user) {
                console.log('success');
                 window.location = '/';
                })
        });
        $modalInstance.close($scope.selected.item);
  };

});