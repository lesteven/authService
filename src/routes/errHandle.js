const debug = require('debug')('http');
const { sendError } = require('../utils/serverResponse');

// custom error handler, use this instead of letting express handle
// it for you
const errHandle = (err, req, res, next) => {
  debug(err);
  sendError(res, 500, 'There was a server error'); 
};


module.exports = errHandle;
