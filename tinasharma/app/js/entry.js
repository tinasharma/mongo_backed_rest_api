require('angular/angular');
require('angular-route');
var angular = window.angular;

var parcelStreamApp = angular.module('ParcelStreamApp', ['ngRoute']);

//order in which you require
//services first because services can be dependency injected into controllers
//then controllers because controllers can be dependency injected into directives
//then directives
require('./filters/filters')(parcelStreamApp);
require('./services/services')(parcelStreamApp);
require('./controllers/controllers')(parcelStreamApp);
require('./directives/directives')(parcelStreamApp);

require('./parcels/parcels')(parcelStreamApp);

parcelStreamApp.config(['$routeProvider', function($route) {
  $route
    .when('/parcels', {
      templateUrl: '/templates/parcels_view.html',
      controller: 'ParcelsController'
    })
    .otherwise({
      redirectTo: '/parcels'
    })
}]);
