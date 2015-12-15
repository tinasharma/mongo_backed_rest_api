module.exports = function(app) {
  require('./controllers/parcels_controller')(app);
  require('./directives/parcel_directive')(app);
  require('./directives/parcel_transclude_directive')(app);
  require('./directives/parcel_form_directive')(app);
};
