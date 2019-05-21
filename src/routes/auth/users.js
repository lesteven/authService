const express = require('express');
const passport = require('passport');
const debug = require('debug')('http');
const passportSetup = require('../../setup/passportSetup');
const regStrategy = require('../../utils/auth');
const sendSuccess = require('../../utils/serverResponse').sendSuccess;
const sendError = require('../../utils/serverResponse').sendError;

const users = express.Router();
passportSetup(users);

users.route('/')
  .get((req, res) => {
    res.send('Hello Users!\n'); 
  })
  
  .post((req, res, next) => {
    // create register strategy before able to use
    regStrategy(passport, res);

    // pass params to authenticate for custom callback
    passport.authenticate('register')(req, res, next);
    // sendSuccess(res, 201, "User registered"); 
  })

  .delete((req, res) => {
    sendError(res, 404, 'no@!');
  })


module.exports = users;
