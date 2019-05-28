const express = require('express');
const lockedTest = express.Router();
const debug = require('debug')('http');




lockedTest.route('/')
  .get((req, res) => {
    debug(req.isAuthenticated());   
    debug(req.user);
    res.status(200).json({ success: 'you have access!' }); 
  })


module.exports = lockedTest;
