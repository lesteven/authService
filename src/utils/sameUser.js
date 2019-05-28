const { sendError } = require('../utils/serverResponse');

const sameUser = (req, res, next) => {
  // requested user must be the same as the current user
  const reqUser = req.params.username;
  const currUser = req.user.username;

  if (req.isAuthenticated() && reqUser == currUser) {
    next();
  } else {
    sendError(res, 401, 'You must be authenticated');
  }
};

module.exports = sameUser;
