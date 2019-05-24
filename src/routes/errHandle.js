const { sendError } = require('../utils/serverResponse');

// custom error handler, use this instead of letting express handle
// it for you
const errHandle(err, req, res, next) {
  sendError(res, 500, 'There was a server error'); 
};


module.exports = errHandle;
