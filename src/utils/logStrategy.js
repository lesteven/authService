const Strategy = require('passport-local');
const debug = require('debug')('http');
const { findUserAndPw } = require('./passportQueries');
const {
  sendError,
  sendErrorCB,
  sendSuccess
} = require('./serverResponse');
const { validatePassword } = require('./encrypt');

const loginUser = (req, res) => {
  const user = req.body.username;
  req.login(user, (err) => {
    if (err) {
      sendError(res, 400, 'There was an error');
    } else {
      sendSuccess(res, 201, 'You have logged in');
    }
  })
}

const handleRequest = async (req, res, queriedData) => {
  const data = queriedData.rows[0];

  if (data) {
    const valid = await validatePassword(req.body.password, 
      data.password);
    if (valid) {
      loginUser(req, res);
    } else {
      sendError(res, 400, 'Invalid username or password');
    }
  } else {
    sendError(res, 400, 'Invalid username or password');
  }
}

const logStrategy = (passport, res) => {
  passport.use('login', new Strategy(
    {
      passReqToCallback: true
    },
    (async (req) => {
      const finishedQuery = await findUserAndPw(req.body)
        .catch(sendErrorCB(res, 500, 'There was a server Error'));

      if (finishedQuery) {
        handleRequest(req, res, finishedQuery);
      }
    })
  ));
};

module.exports = {
  loginUser,
  logStrategy
}
