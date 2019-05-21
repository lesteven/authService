const { hashPassword } = require('./encrypt');
const { insertUser } = require('./passportQueries');
const {
  sendError,
  sendErrorCB,
  sendSuccess
} = require('./serverResponse');


const createAccount = async (res, data) => {
  const password = await hashPassword(data.password);
  const userData = {
    ...data,
    password
  }
  return insertUser(userData);
}


const handleRequest = async (res, req, queriedData) => {
  if (user) {
    sendError(res, 400, 'User already exist');
  }
  if (!user) {
    const createAccount = await createAccount(res, req.body);
    loginUser(req, res, );
  }
  return sendError(res, 500, 'There was a server error');
};


const regStrategy = (passport, res) => {
  passport.use('register', new Strategy(
    { passReqToCallback: true },
    (async (req) => {
      debug('req.body: ', req.body);
        
      const finishedQuery = await registerUser(req.body)
        .catch(sendErrorCB(res, 500, 'There was a sever Error'));

      if (finishedQuery) {
        handleRequest(res, req, finishedQuery);
      }
    })
  ));
};

module.exports = regStrategy;
