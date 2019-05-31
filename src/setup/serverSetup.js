const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('winston');

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'authService' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error'
    }),
    new transports.File({ filename: 'combined.log' }),
  ]
});

logger.info('test info');
logger.error('test error');

const serverSetup = (app) => {
  if (app.get('env') === 'development') {
    //app.use(morgan('dev'));
    logger.add(new transports.Console({
      format: format.simple()
    }));
  }

  app.use(bodyParser.json());
};

module.exports = {
  serverSetup,
  logger
}
