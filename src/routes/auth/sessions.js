const express = require('express');
const debug = require('debug')('http');
const passport = require('passport');
const { logStrategy } = require('../../utils/logStrategy');
const asyncWrap = require('../../utils/asyncWrap');
const { sameUser, checkBody } = require('../../utils/checks');
const {
  sendSuccess,
} = require('../../utils/serverResponse');
const { logout } = require('../../utils/passportQueries');

const sessions = express.Router();

sessions.route('/')
  .post(checkBody, asyncWrap(async (req, res, next) => {
    logStrategy(passport, res);
    passport.authenticate('login')(req, res, next);
  }));

sessions.route('/:username')
  .delete(sameUser, asyncWrap(async (req, res, next) => {
    logout(req, res);
    sendSuccess(res, 200, 'You have logged out');
  }));
  

module.exports = sessions;
