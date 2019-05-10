const express = require('express');
const debug = require('debug')('http');

const serverSetup = require('./setup/serverSetup');
const passportSetup = require('./setup/passportSetup');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

serverSetup(app);

app.get('/', (req,res) => {
  res.send('Hello World!\n');
})

app.use('/api', apiRoutes);


if (app.get('env') === 'development') {
  debug('Development mode!');
} else {
  debug('Production mode!');
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});

