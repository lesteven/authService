const { sendError } = require('../utils/serverResponse');

const authHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    sendError(res, 401, 'You must be authenticated');
  }
};

module.exports = authHandler;
