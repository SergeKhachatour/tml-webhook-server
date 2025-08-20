const winston = require('winston');

// Azure Web Apps logging configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Also log to stderr for Azure Web Apps
const originalError = console.error;
console.error = (...args) => {
  originalError(...args);
  process.stderr.write(args.join(' ') + '\n');
};

module.exports = { logger }; 