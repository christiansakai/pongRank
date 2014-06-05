'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    User = mongoose.model('User');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.awesomeUsers = function(req, res) {
  return User.find(function (err, users) {
    if (!err) {
      return res.json(users);
    } else {
      return res.send(err);
    }
  });
};

exports.userWin = function (req, res) {
  User.findOneAndUpdate(req.query, {$inc:{wins: 1}} ,function (err, user) {
    res.end();
  });
  return User.findOneAndUpdate(req.query, {$inc:{rank: -1}} ,function (err, user) {
    res.end();
  });
};

exports.userLoss = function (req, res) {
  User.findOneAndUpdate(req.query, {$inc:{losses: 1}} ,function (err, user) {
    res.end();
  });
  return User.findOneAndUpdate(req.query, {$inc:{rank: 1}} ,function (err, user) {
    res.end();
  });
};