const express = require('express');
const debug = require('debug')('http');
const passport = require('passport');
const { logStrategy } = require('../../utils/logStrategy');
const asyncWrap = require('../../utils/asyncWrap');

const sessions = express.Router();

sessions.route('/')
  .get((req,res) => {
  })
  
  .post(asyncWrap(async (req, res, next) => {
    logStrategy(passport, res);
    passport.authenticate('login')(req, res, next);
  }));


module.exports = sessions;
