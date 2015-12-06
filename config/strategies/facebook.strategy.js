var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () =>
  passport.use('facebook',
    new FacebookStrategy(
      {
        clientID: '1767996970094419',
        clientSecret: '912c139b07f170034edf9462799c06c9',
        callbackURL: 'http://localhost:3030/auth/facebook/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
          return done(null, profile);
        });
      })
  )
