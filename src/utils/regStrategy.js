const Strategy = require('passport-local');
const debug = require('debug')('http');
const { insertUser, userAvail } = require('./passportQueries');
const {
  sendError,
  sendErrorCB,
  sendSuccess
} = require('./serverResponse');
const { loginUser } = require('./logStrategy');


const handleRequest = async (res, req, userAvail) => {
  debug('userAvail: ', userAvail);
  if (userAvail) {
    const createAccount = await insertUser(req.body);
    loginUser(req, res);
  } else {
    debug('!!!!!!! user does not exist!');
    sendError(res, 400, 'User already exist');
  }
};


const regStrategy = (passport, res) => {
  passport.use('register', new Strategy(
    { passReqToCallback: true },
    (async (req) => {
      debug('req.body: ', req.body);
        
      const finishedQuery = await userAvail(req.body)
        .catch(sendErrorCB(res, 500, 'There was a server Error'));

      handleRequest(res, req, finishedQuery);
    })
  ));
};

module.exports = regStrategy;
