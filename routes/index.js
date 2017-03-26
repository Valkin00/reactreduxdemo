var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('basic-auth');
var path = require('path');


// uncomment to allow CORS
// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
//   next();
// });

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});



// Register a new user
router.post('/users/signup', function (req, res, next) {
  var userCredentials = auth.parse(req.body.headers.authorization);

  User.create({email: userCredentials.name, password: userCredentials.pass}, function(err, user){

    if(err)
    {
      return next(err);
    }
    console.log('User successfully created');
    return res.status(200).json({
        userId: user._id,
        markers: user.markers 
      });
  });

});


// Login
router.post('/users/signin', function (req, res, next) {

  var userCredentials = auth.parse(req.body.headers.authorization);
  User.findOne({email: userCredentials.name, password: userCredentials.pass}, function(err, user){
    if(err)
    {
      return res.status(500).json({
          error: 'Could not log in user'
      });
    }
    if (user)
    {
        res.status(200).json({
          userId: user._id,
          markers: user.markers 
        });
    }
    else
    {
        return res.status(500).json({error: "User doesn't exist"});
    }
  });
});


// Deleting user
router.delete('/users/:id', function(req,res,next){
  User.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;

        res.json(resp);
  });
});

// Save user's markers
router.post('/users/:id/markers', function(req,res,next){

      User.update({_id: req.params.id}, {markers: req.body.markers}, function(err, resp){
      if(err) throw err;
      return res.status(200).json({
        message: 'Markers successfully saved.'
      });
    });
});


// get users markers
router.get('/users/:id/markers', function(req,res,next){
  User.findById(req.params.id, function(err, user){
    if(err) throw err;

    res.status(200).json({
      markers: user.markers
    });
  });
});



module.exports = router;