const express = require('express');
const passport = require('passport');
const debug = require('debug')('http');
const passportSetup = require('../../setup/passportSetup');
const regStrategy = require('../../utils/auth');
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
  .get((req, res) => {
    res.send('Hello Users!\n'); 
  })
  
  .post((req, res, next) => {
    // create register strategy before able to use
    regStrategy(passport, res);

    // pass params to authenticate for custom callback
    passport.authenticate('register')(req, res, next);
  })

  .delete((req, res) => {
    sendError(res, 404, 'no@!');
  })

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
