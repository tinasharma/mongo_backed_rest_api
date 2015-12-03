module.exports = function(app) {
  app.controller('ParcelsController', ['$scope', '$http', function($scope, $http) {
    $scope.parcels = [];
    $scope.newParcel = null;
    $scope.errors = [];
    $scope.master = {};
    $scope.master = angular.copy($scope.parcels);
    var defaults = {size: 'small, medium, large', weight: 'less than 10 lbs.'};
    $scope.newParcel = Object.create(defaults);

    $scope.getAll = function() {
      $http.get('/api/parcels')
        .then(function(res) {
          $scope.parcels = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(parcel) {
      $http.post('/api/parcels', parcel)
        .then(function(res) {
          $scope.parcels.push(res.data);
          $scope.newParcel = null;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.update = function(parcel) {
      parcel.editing = false;
      $http.put('/api/parcels/' + parcel._id, parcel)
        .then(function(res) {
          console.log('parcel is updated');
        }, function(err) {
          $scope.errors.push('could not update: ' + parcel.name + ' parcel');
          console.log(err.data);
      });

    };
    $scope.reset = function() {
      $scope.parcel = angular.copy($scope.master);
      //$scope.getAll();
    };

    //$scope.reset();

    $scope.remove = function(parcel) {
      $scope.parcels.splice($scope.parcels.indexOf(parcel), 1);
      $http.delete('/api/parcels/' + parcel._id)
        .then(function(res) {
          console.log('parcel deleted');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not delete parcelzzz: ' + parcel.name);
          $scope.getAll();
      });
    };

  }]);
};
