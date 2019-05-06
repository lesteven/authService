const morgan = require('morgan');
const bodyParser = require('body-parser');


const serverSetup = (app) => {
  app.use(morgan('dev'));

  app.use(bodyParser.json());
};

module.exports = serverSetup;
