const passport = require('passport');
const session = require('express-session');
const CassandraStore = require('cassandra-store');
const debug = require('debug')('http');
const secret = require('../../config').secret;

const passportSetup = (app) => {
  const options = {
    table: "sessions",
    client: null,
    clientOptions: {
      contactPoints: [ 'localhost' ],
      keyspace: 'users',
      queryOptions: {
        prepare: true
      }
    }
  };

  app.use(session({
    store: new CassandraStore(options),
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
