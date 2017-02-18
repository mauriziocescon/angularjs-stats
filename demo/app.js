angular.module("demo", ["angularStats"])
    .controller("MainCtrl", ["$scope", function ($scope) {
        $scope.name = "MainCtrl";
        $scope.values = [0];

        $scope.clickButton = function () {
            var value = new Date().getTime();
            $scope.values.push(value);
        };
    }])
    .controller("StatCtrl", ["$scope", "AngularStats", function ($scope, AngularStats) {
        $scope.name = "StatCtrl";
        AngularStats.setStartingElement("[ng-app]");

        $scope.getStats = function() {
            return AngularStats.analyzeWebApp();
        }
    }]);