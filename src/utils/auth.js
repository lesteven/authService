const sendError = require('./serverResponse');

const handleRequest = async (res, req, queriedData) => {


};


const regStrategy = (passport, res) => {
  passport.use('register', new Strategy(
    { passReqToCallback: true },
    (async (req) => {
      debug('req.body: ', req.body);
        
      const finishedQuery = await registerUser(req.body)
        .catch();

      if (finishedQuery) {
        handleRequest(res, req, finishedQuery);
      }
    })
  ));
};

const testReg = (passport, res) => {
  passport.use('register', new Strategy(
    { passReqToCallback: true },
    (req => {
      if (err) {
        debug('first error');
          sendError(500, "There was an error");
      }
      if (!user) {
        debug('second error');
        res.status(400).json({
          status: 400,
          error: "User already exist",
        });
      }
      /*
      req.login(user, function(err) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: "There was an error",
          });
        }
      });
      */
      // debug(req.login + "");
      res.status(201).json({
        status: 201,
        data: "User created"
      });
    })
  ))
}
