const express = require('express');
const debug = require('debug')('http');
const lockedTest = require('./lockedTest');
const authHandler = require('../utils/authHandler');

const lockedRoutes = express.Router();

lockedRoutes.use(authHandler);

lockedRoutes.use('/test', lockedTest);

module.exports = lockedRoutes;
