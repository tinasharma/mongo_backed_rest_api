var mongoose = require('mongoose');
var express = require('express');
var app = express();
var parcelsRouter = require(__dirname + '/routes/parcels_routes.js');
var authRouter = require(__dirname + '/routes/auth_routes.js');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/parcel_stream_dev');

app.use('/api', parcelsRouter);
app.use('/api', authRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running');
});
