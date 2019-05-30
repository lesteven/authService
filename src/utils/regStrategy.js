const Strategy = require('passport-local');
const debug = require('debug')('http');
const { insertUser, userAvail } = require('./passportQueries');
const {
  sendError,
  sendErrorCB,
  sendSuccess
} = require('./serverResponse');
const { loginUser } = require('./logStrategy');


const handleRequest = async (res, req, userDontExist) => {
  debug('userDontExist: ', userDontExist);
  if (userDontExist) {
    const createAccount = await insertUser(req.body)
      .catch((e) => {
        console.log(e);
      });

    if (createAccount) {
      loginUser(req, res);
    } else {
      sendError(res, 500, 'There was a system error');
    }
  } else {
    sendError(res, 400, 'User already exist');
  }
};


const regStrategy = (passport, res) => {
  passport.use('register', new Strategy(
    { passReqToCallback: true },
    (async (req) => {
      debug('req.body: ', req.body);
        
      const finishedQuery = await userAvail(req.body)
        .catch((e) => {
          console.log(e);
        });

      // if error, finishedQuery will be undefined
      if (finishedQuery !== undefined) {
        handleRequest(res, req, finishedQuery);
      } else {
        sendError(res, 500, 'There was a system error');
      }
    })
  ));
};

module.exports = regStrategy;
