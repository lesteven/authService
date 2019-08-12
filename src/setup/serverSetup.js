const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('winston');
require('winston-daily-rotate-file');

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf((info) => {
  return JSON.stringify(info);
});

// default datePattern is YYYY-MM-DD
const transportErr = new transports.DailyRotateFile({
  filename: './logs/error/error.log',
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d'
});
// default level is info
const transportAll = new transports.DailyRotateFile({
  filename: './logs/combined/combined.log',
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = createLogger({
  format: combine(
    label({ label: 'authService' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    transportErr,
    transportAll
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
  app.use(bodyParser.urlencoded({extended: false}));
};

module.exports = {
  serverSetup,
  logger
}
