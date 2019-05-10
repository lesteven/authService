const passport = require('passport');
const session = require('express-session');
const debug = require('debug')('http');

const passportSetup = (app) => {

  //app.use(session(sess));
  app.use(session({ 
    secret: 'testing!',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserialize user');
  });
};

module.exports = passportSetup;
