const passport = require('passport');
const session = require('express-session');
const CassandraStore = require('cassandra-store');
const debug = require('debug')('http');
const secret = require('../../config').secret;
const { deserialize } = require('../utils/passportQueries');


const passportSetup = (app) => {
  const production = process.env.NODE_ENV === 'production';

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
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: production }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // value of user is passed on value that is passed in through
  // req.login (in logStrategy)
  passport.serializeUser((username, done) => {
    done(null, username);
  });

  passport.deserializeUser(deserialize);
};

module.exports = passportSetup;
