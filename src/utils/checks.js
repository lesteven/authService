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

const checkBody = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    sendError(res, 400, 'Must send username and password');
  } else {
    next();
  }
}

module.exports = {
  sameUser,
  checkBody,
}
