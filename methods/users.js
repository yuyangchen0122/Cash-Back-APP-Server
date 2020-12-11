var User = require('../models/User');
var jwt = require('jwt-simple');
var validator = require('validator');

var config = require('../config/dbconfig');

var functions = {
  signup: function (req, res) {
    if((!req.body.email) || (!req.body.password) || (!req.body.confirmPassword)){
      res.json({
        success: false,
        msg: 'Enter all fields'
      });
    }else if(!validator.isEmail(req.body.email)){
      res.json({
        success: false,
        msg: 'Invalid email address'
      });
    }else if(req.body.password !== req.body.confirmPassword){
      res.json({
        success: false,
        msg: 'Passwords not matched'
      });
    }else{
      var newUser = User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err, newUser) {
        if(err){
          res.json({
            success: false,
            msg: 'Failed to save new user'
          });
        }else{
          res.json({
            success: true,
            msg: 'Sucessfully save new user'
          });
        }
      })
    }
  },
  login: function (req, res) {
    if((!req.body.email) || (!req.body.password)){
      res.json({
        success: false,
        msg: 'Enter all fields'
      });
    }
    else if(!validator.isEmail(req.body.email)){
      res.json({
        success: false,
        msg: 'Invalid email address'
      });
    }else{
      User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err
        if (!user) {
          res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
        }else{
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              var token = jwt.encode(user, config.secret)
              res.json({success: true, token: token})
            }
            else {
              return res.status(403).send({success: false, msg: 'Authentication failed, password not correct'})
            }
          });
        }
      })
    }
  }
}

module.exports = functions;