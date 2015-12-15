module.exports = function(app) {
  app.directive('parcelTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/parcel_transclude_directive.html',
      transclude: true,
      scope: {
        messageOne: '@'
      }
    }
  });
};
