angular.module('demo', ['angular-stats'])
  .controller('MainCtrl', ['$scope', function($scope) {
    $scope.name = 'MainCtrl';
    $scope.values = [0];

    $scope.clickButton = function() {
      var value = new Date().getTime();
      $scope.values.push(value);
    };
  }])
  .controller('StatCtrl', ['$scope', '$document', 'AngularStats', function($scope, $document, AngularStats) {
    $scope.name = 'StatCtrl';
    AngularStats.setStartingElement($document[0].querySelector('div[ng-app]'));

    $scope.getStats = function() {
      return AngularStats.analyzeWebApp();
    };
  }]);
