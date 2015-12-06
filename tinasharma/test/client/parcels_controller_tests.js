require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('parcels controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('ParcelStreamApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('ParcelsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.parcels)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('ParcelsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to parcels with a GET all', function() {
      $httpBackend.expectGET('/api/parcels').respond(200, [{_id:1, name: 'test parcel'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.parcels[0].name).toBe('test parcel');
    });

    it('should be able to create a new parcel', function() {
      $httpBackend.expectPOST('/api/parcels', {name: 'test parcel', size: 'small', weight: '3'}).respond(200, {name: 'a different parcel'});
      expect($scope.parcels.length).toBe(0);
      expect($scope.newParcel).toEqual($scope.defaults);
      $scope.newParcel.name = 'test parcel';
      $scope.create($scope.newParcel);
      $httpBackend.flush();
      expect($scope.parcels[0].name).toBe('a different parcel');
      expect($scope.newParcel).toEqual($scope.defaults);
    });

    it('should be able to update a parcel', function() {
      $scope.parcels = [{_id: 123, name: 'test parcel'}];
      $httpBackend.expectPUT('/api/parcels/' + $scope.parcels[0]._id, {_id: 123, name: 'test parcel', editing: false}).respond(200, {name: 'a very different parcel'});
      $scope.update($scope.parcels[0]);
      $httpBackend.flush();
      expect($scope.parcels[0].name).toBe('test parcel');
      expect($scope.parcels[0].editing).toBe(false);
    });

    it('should be able to delete a parcel', function() {
      $scope.parcels = [{_id: 123, name: 'test parcel'}];
      $httpBackend.expectDELETE('/api/parcels/' + $scope.parcels[0]._id).respond(200);
      $scope.remove($scope.parcels[0]);
      $httpBackend.flush();
      expect($scope.parcels.length).toBe(0);
    });

  });
});
