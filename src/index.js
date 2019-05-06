const express = require('express');
const http = require('http');
const debug = require('debug')('http');

const app = express();

app.get('/', (req,res) => {
  res.send('Hello World!\n');
})


if (app.get('env') === 'development') {
  debug('Development mode!');
} else {
  debug('Production mode!');
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});

