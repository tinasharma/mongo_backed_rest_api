var mongoose = require('mongoose');
var fs = require('fs');
var express = require('express');
var app = express();

var parcelsRouter = require(__dirname + '/routes/parcels_routes.js');
var authRouter = require(__dirname + '/routes/auth_routes.js');

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/parcel_stream_dev');

app.get('/:filename', function(req, res) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if (err) {
      console.log(err);
      return next();
    }

    if (!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.use('/api', parcelsRouter);
app.use('/api', authRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running');
});
