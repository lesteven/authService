const express = require('express');
const debug = require('debug')('http');

const serverSetup = require('./setup/serverSetup');
const passportSetup = require('./setup/passportSetup');
const apiRoutes = require('./routes/apiRoutes');
const { sendError } = require('./utils/serverResponse');

const app = express();

serverSetup(app);

app.get('/', (req,res) => {
  res.send('Hello World!\n');
})

app.use('/api', apiRoutes);

app.use('*', (req, res) => {
  sendError(res, 404, 'This page does not exist'); 
});


if (app.get('env') === 'development') {
  debug('Development mode!');
} else {
  debug('Production mode!');
}


module.exports = app;
