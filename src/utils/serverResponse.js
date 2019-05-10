const debug = require('debug')('http');

// responses return function in order to handle errors

function sendError(res, status, message) {
  return res.status(status).json({
    status,
    error: message,
  });
};

function sendErrorCB(res, status, message) {
  return ((err) => {
    debug(err);
    return sendError(res, status, message);
  });
};

function sendSuccess(res, status, data) {
  return res.status(status).json({
    status,
    data
  });
};

module.exports = {
  sendError: sendError,
  sendErrorCB: sendErrorCB,
  sendSuccess: sendSuccess,
}
