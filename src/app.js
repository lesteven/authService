const express = require('express');
const debug = require('debug')('http');
const cors = require('cors');

const { serverSetup, logger } = require('./setup/serverSetup');
const passportSetup = require('./setup/passportSetup');
const apiRoutes = require('./routes/apiRoutes');
const { sendSuccess, sendError } = require('./utils/serverResponse');
const errHandle = require('./routes/errHandle');

const app = express();

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}

app.use(cors(corsOptions));

serverSetup(app);
passportSetup(app);


app.get('/', (req, res) => {
  sendSuccess(res, 200, 'Welcome to auth micoservice');
});

app.use('/api', apiRoutes);

app.use('*', (req, res) => {
  sendError(res, 404, 'This page does not exist'); 
});

app.use(errHandle);

if (app.get('env') === 'development') {
  debug('Development mode!');
} else {
  debug('Production mode!');
  logger.info('Production mode!');
}


module.exports = app;
