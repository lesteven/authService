const express = require('express');
const passport = require('passport');
const debug = require('debug')('http');
const regStrategy = require('../../utils/regStrategy');
const asyncWrap = require('../../utils/asyncWrap');
const {
  sendSuccess,
  sendError
} = require('../../utils/serverResponse');
const { sameUser, checkBody } = require('../../utils/checks');
const { deleteUser, logout } = require('../../utils/passportQueries');

const users = express.Router();

users.route('/')
  .post(checkBody, asyncWrap(async (req, res, next) => {
    // create register strategy before able to use
    regStrategy(passport, res);

    // pass params to authenticate for custom callback
    passport.authenticate('register')(req, res, next);
  }))

/*
users.route('/err')
  .get(asyncWrap(async (req, res, next) => {
    await Promise.reject('rejected mate');
  }));
  */

users.route('/:username')
  .delete(sameUser, asyncWrap(async (req, res, next) => {
    // save username to const to preserve username when logged out
    // username needed to delete account
    const user = {
      username: req.user.username
    }
    logout(req, res);
    await deleteUser(user);
    sendSuccess(res, 200, 'Account has been deleted');
  }))

module.exports = users;
