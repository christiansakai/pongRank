'use strict';

angular.module('pongrankAppChallenge', ['ui.bootstrap', 'pongrankAppModalInstance'])
  .controller('ChallengeCtrl', function ($scope, $routeParams, $modal, $log) {
    // $http.get('api/awesomeUsers').success(function(users) {
    //   $scope.users = users;
    // });
  $scope.opponent = $routeParams.opponent;

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/challengeModal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
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
