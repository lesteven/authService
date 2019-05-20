const express = require('express');
const debug = require('debug')('http');
const passportSetup = require('../../setup/passportSetup');

const cookies = express.Router();
passportSetup(cookies);

cookies.route('/')
  .get((req,res) => {
    debug('sessionId: ', req.sessionID);
    res.send('Hello Cookies!\n'); 
  })
  
  .post((req,res) => {
    res.send('Post Cookies!\n');
  });


module.exports = cookies;
