const debug = require('debug')('http');
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});