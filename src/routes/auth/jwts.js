const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const jwts = express.Router();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'issuer',
  audient: 'site',
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

jwts.route('/')
  .get((req,res) => {
    res.send('Hello Jwts!\n'); 
  })
  
  .post((req,res) => {
    res.send('Post Jwts!\n');
  });


module.exports = jwts;
