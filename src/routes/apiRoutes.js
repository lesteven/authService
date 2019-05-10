const express = require('express');
const debug = require('debug')('http');

const jwts = require('./auth/jwts');
const users = require('./auth/users');
const cookies = require('./auth/cookies');


const apiRoutes = express.Router();

apiRoutes.use('/jwts', jwts);
apiRoutes.use('/users', users);
apiRoutes.use('/cookies', cookies);

module.exports = apiRoutes;
