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
const {
  insertUser,
  userAvail
} = require('../../utils/passportQueries');

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
/*
  .post(asyncWrap(async (req, res, next) => {
    debug(req.body);
    sendSuccess(res, 200, 'hello!');
  }))
  */
  .delete(asyncWrap(async (req, res, next) => {
    sendError(res, 404, 'no@!');
  }))

const data = {
  username: 'hello',
  password: 'lala123',
}

users.route('/test')
  .get(asyncWrap(async (req, res, next) => {
    const noUser = await userAvail(data);
    if (noUser) {
      sendSuccess(res, 200, 'User dont exist');
    } else {
      sendError(res, 400, 'User already exist');
    }
  }))

  .post(asyncWrap(async (req, res, next) => {
    const result = await insertUser(data)
    console.log(result);
    sendSuccess(res, 201, result);
  }));


module.exports = users;
