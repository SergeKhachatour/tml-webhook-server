const winston = require('winston');

// Simple console transport for Azure Web Apps
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = { logger }; 