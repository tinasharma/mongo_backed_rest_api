module.exports = function(app) {
  app.directive('parcelFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/parcel_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        parcel: '=',
        save: '&'
      }
    }
  });
};
