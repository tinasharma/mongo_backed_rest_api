var angular = window.angular;
module.exports = function(app) {
  app.controller('ParcelsController', ['$scope', '$http', function($scope, $http) {
    $scope.parcels = [];
    $scope.newParcel = null;
    $scope.errors = [];
    $scope.updatingParcels = {};
    $scope.defaults = {size: 'small', weight: '3'};
    $scope.newParcel = angular.copy($scope.defaults);

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
          $scope.newParcel = angular.copy($scope.defaults);
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

    $scope.startUpdate = function(parcel) {
      parcel.editing = true;
      $scope.updatingParcels[parcel._id] = {name: parcel.name, size: parcel.size, weight: parcel.weight};
    };

    $scope.reset = function(parcel) {
      var oldParcel = $scope.updatingParcels[parcel._id];
      $scope.parcel = angular.copy($scope.master);
      parcel.name = oldParcel.name;
      parcel.size = oldParcel.size;
      parcel.weight = oldParcel.weight;
      parcel.editing = false;
    };

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
