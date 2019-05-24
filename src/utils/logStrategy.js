const {
  sendError,
  sendErrorCB,
  sendSuccess
} = require('./serverResponse');

const loginUser = (req, res) => {
  const user = req.body.username;
  req.login(user, (err) => {
    if (err) {
      sendError(res, 400, 'There was an error');
    } else {
      sendSuccess(res, 201, 'You have logged in');
    }
  })
  //sendSuccess(res, 201, 'You are now logged in');
}

const logStrategy = (passport, res) => {


}

module.exports = {
  loginUser,
  logStrategy
}
