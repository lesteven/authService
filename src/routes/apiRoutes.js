const express = require('express');
const debug = require('debug')('http');

const users = require('./auth/users');
const sessions = require('./auth/sessions');
const search = require('./search');
const testRoute = require('./testRoute');


const apiRoutes = express.Router();

apiRoutes.use('/users', users);
apiRoutes.use('/sessions', sessions);
apiRoutes.use('/search', search);

module.exports = apiRoutes;
