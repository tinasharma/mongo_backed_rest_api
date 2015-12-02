require('angular/angular');
var angular = window.angular;

var parcelStreamApp = angular.module('ParcelStreamApp', []);

require('./parcels/parcels')(parcelStreamApp);
