const express = require('express');
const debug = require('debug')('http');

const users = require('./auth/users');
const sessions = require('./auth/sessions');


const apiRoutes = express.Router();

apiRoutes.use('/users', users);
apiRoutes.use('/sessions', sessions);

module.exports = apiRoutes;
