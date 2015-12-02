var mongoose = require('mongoose');

var parcelSchema = new mongoose.Schema({
  name: String, //name of mailman
  item: {type: String, default: 'mailing_packet'},
  size: String, //small, medium, large
  weight: {type: Number, max: 10},
  location: {type: String, default: 'Seattle'}
});

module.exports = mongoose.model('Parcel', parcelSchema);
