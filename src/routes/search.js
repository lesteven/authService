const express = require('express');
const asyncWrap = require('../utils/asyncWrap');
const { searchES } = require('../utils/esQueries');
const { sendSuccess } = require('../utils/serverResponse');


const search = express.Router();

search.route('/')
  .post(asyncWrap(async (req, res, next) => {
      let data = await searchES(req.body.username);
      data = data.map(e => e._source.user); 
      sendSuccess(res, 200, data);    
  }))

module.exports = search;
