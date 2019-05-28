const express = require('express');
const passport = require('passport');
const debug = require('debug')('http');
const regStrategy = require('../../utils/regStrategy');
const asyncWrap = require('../../utils/asyncWrap');
const {
  sendSuccess,
  sendError
} = require('../../utils/serverResponse');
const sameUser = require('../../utils/sameUser');

const users = express.Router();

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
  .delete(sameUser, asyncWrap(async (req, res, next) => {
    console.log(req.isAuthenticated());
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    console.log('req.user', req.user.username);
    sendError(res, 404, 'no@!');
  }))

module.exports = users;
