// var express = require('express');
// var jsonParser = require('body-parser').json();
// var handleError = require(__dirname + '/../lib/handleServerError');
// var basicHttp = require(__dirname + '/../lib/basic_http_authentication.js');
// var User = require(__dirname + '/../models/user');

// var authRouter = module.exports = exports = express.Router();

// authRouter.post('/signup', jsonParser, function(req, res) {

//   //check here to see if the user already exists
//   User.findOne({'auth.basic.username': req.body.username}, function(err, user) {
//     if (user) {
//       return res.status(401).json({msg: 'user already exists'});
//     }
//     else {
//       var user = new User();

//       user.auth.basic.username = req.body.username;
//       user.username = req.body.username;
//       user.hashPassword(req.body.password);

//       user.save(function(err, data) {
//         if (err) return handleError(err, res);
//         user.generateToken(function(err, token) {
//           if (err) return handleError(err, res);

//           res.json({token: token});
//         });

//       });
//     }
//   });
// });

// authRouter.get('/signin', basicHttp, function(req, res) {
//   if (!(req.auth.username || req.auth.password)) {
//     console.log("no basic auth provided");
//     return res.status(401).json({msg: 'no authentication'})
//   }

//   User.findOne({'auth.basic.username' : req.auth.username}, function(err, user) {
//     if (err) {
//       console.log('no basic auth provided');
//       return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
//     }

//     if (!user) {
//       console.log('no basic auth provided');
//       return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
//     }

//     if (!user.checkPassword(req.auth.password)) {
//      console.log('no basic auth provided');
//      return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
//     }

//     user.generateToken(function(err, token) {
//       if (err) return handleError(err, res);

//       res.json({token: token});
//     });

//   });
// });
