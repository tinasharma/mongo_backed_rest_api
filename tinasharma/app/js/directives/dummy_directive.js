module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'AC',
      template: '<h6>My name is: {{greeting}}</h6><input type="text" data-ng-model="greeting">',
      scope: {
        greeting: '@'
      }
    }
  });
};
