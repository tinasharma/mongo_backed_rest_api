module.exports = function(app) {
  app.directive('parcelDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/parcel_directive_template.html',
      scope: {
        parcel: '='
      }
    }
  });
};
