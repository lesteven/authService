const express = require('express');
const asyncWrap = require('../utils/asyncWrap');
const debug = require('debug')('http');

const testRoute = express.Router();

testRoute.route('/')
  .get(asyncWrap(async (req,res) => {
    throw new Error('this is an error'); 
  }))

testRoute.route('/2')
  .get(asyncWrap(async (req,res) => {
    testWrap(req, res);
  }))
  

function test() {
  return Promise.reject('rejected')
}

async function testWrap(req, res) {
  const result = await test().catch((e) => {
    console.log(e);
  });
  console.log('result', result);
  if (result) {
    res.status(200).json({ data: 'success' });
  } {
    res.status(400).json({ err: 'err in wrapper' });
  }
}


module.exports = testRoute;
