'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    passport = require('passport');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  app.route('/api/findCurrent/?')
    .get(api.findCurrent);

  app.route('/api/sendText/?')
    .get(api.sendText);

  app.route('/api/recordWin/?')
    .post(api.userWin);

  app.route('/api/recordOppWin/?')
    .post(api.opponentWin);

  app.route('/api/recordLoss/?')
    .post(api.userLoss);

  app.route('/api/recordOppLoss/?')
    .post(api.opponentLoss);

  app.route('/api/awesomeUsers')
    .get(api.awesomeUsers);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);

  app.route('/api/users/me')
    .get(users.me);

  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);

  app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email' }));
  app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
          successRedirect : '/',
          failureRedirect : '/login'
    }));

  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};