'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    twilio = require('twilio'),
    client = new twilio.RestClient('ACe9086308697f1104417631bd00487483', '300ddf25982bb860a03a51e10b661576');

/**
 * Get awesome Users
 */

exports.awesomeUsers = function(req, res) {
  return User.find(function (err, users) {
    if (!err) {
      return res.json(users);
    } else {
      return res.send(err);
    }
  });
};

exports.findCurrent = function (req, res) {
  return User.findOne(req.query, function (err, user) {
    if (!err) {
      return res.json(user);
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

exports.opponentWin = function (req, res) {
  User.findOneAndUpdate(req.query, {$inc:{wins: 1}} ,function (err, user) {
    res.end();
  });
};

exports.userLoss = function (req, res) {
  return User.findOneAndUpdate(req.query, {$inc:{losses: 1}} ,function (err, user) {
    res.end();
  });
};

exports.opponentLoss = function (req, res) {
  User.findOneAndUpdate(req.query, {$inc:{losses: 1}} ,function (err, user) {
    res.end();
  });
  return User.findOneAndUpdate(req.query, {$inc:{rank: 1}} ,function (err, user) {
    res.end();
  });
};

exports.checkTelephone = function (req, res) {
  User.find({name: req.query.name}, function (err, user) {
    if (typeof user[0].telephone === 'undefined') {
      res.send(false);
    } else if (typeof user[0].telephone !== 'undefined') {
      res.send(true);
    }
    // if (user.telephone === )
  });
};


exports.addTelephone = function (req, res) {
  return User.findOneAndUpdate({name: req.query.name}, {$set: { telephone: req.query.body }}, function (err, user) {
      res.end();
  });
};

exports.sendText = function (req, res) {
  console.log(req.query);
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
  client.sms.messages.create({
      to: req.query.number,
      from:'+16474965796',
      body: req.query.body
  }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
        res.send(200);
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          res.send(400);
          console.log('Oops! There was an error.');
      }
  });
};
