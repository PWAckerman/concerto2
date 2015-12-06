var passport = require('passport');
module.exports = (app) => {
  app
    .use(passport.initialize())
    .use(passport.session())
    .get('/auth/facebook', passport.authenticate('facebook'),
      (req, res) => console.log("I'm inconsequential!")
    )
    .get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/login'}),
      (req, res) => res.redirect('/')
    )

  passport.serializeUser(
    (user, done) => done(null, user)
  );
  passport.deserializeUser(
    (user, done) => done(null, user)
  );

  require("./strategies/facebook.strategy")
}
