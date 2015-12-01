require('angular/angular');
var angular = window.angular;

var parcelApp = angular.module('parcelstream', []);

parcelApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Mailing service!';

  $scope.alertGreeting = function() {
    alert($scope.greeting);
  };
}]);
