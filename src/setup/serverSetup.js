const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('winston');

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf((info) => {
  return JSON.stringify(info);
});

const logger = createLogger({
  format: combine(
    label({ label: 'authService' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error'
    }),
    new transports.File({ filename: 'combined.log' }),
  ]
});

// overwrites the stream.write function in morgan
// writes to winston log files instead of process.stdout
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
}

const serverSetup = (app) => {
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined', { "stream": logger.stream }));
  }

  app.use(bodyParser.json());
};

module.exports = {
  serverSetup,
  logger
}
