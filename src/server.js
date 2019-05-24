const debug = require('debug')('http');
const app = require('./app');
const config = require('../config/index');

app.listen(config.port, () => {
  debug(`Listening on port ${config.port}`);
});
