const {
  sendError,
  sendErrorCB,
  sendSuccess
} = require('./serverResponse');

const loginUser = (req, res, data) => {
  sendSuccess(res, 201, 'You are now logged in');
}

const logStrategy = (passport, res) => {


}

module.exports = {
  loginUser,
  logStrategy
}
