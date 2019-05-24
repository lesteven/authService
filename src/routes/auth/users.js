const express = require('express');
const passport = require('passport');
const debug = require('debug')('http');
const passportSetup = require('../../setup/passportSetup');
const regStrategy = require('../../utils/regStrategy');
const asyncWrap = require('../../utils/asyncWrap');
const {
  sendSuccess,
  sendError
} = require('../../utils/serverResponse');

const users = express.Router();
passportSetup(users);

users.route('/')
  .get(asyncWrap(async (req, res, next) => {
    res.send('Hello Users!\n'); 
  }))

  .post(asyncWrap(async (req, res, next) => {
    // create register strategy before able to use
    regStrategy(passport, res);

    // pass params to authenticate for custom callback
    passport.authenticate('register')(req, res, next);
  }))

users.route('/:username')
  .delete(asyncWrap(async (req, res, next) => {
    console.log(req.isAuthenticated());
    console.log(req.body);
    sendError(res, 404, 'no@!');
  }))

module.exports = users;
