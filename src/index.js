// Add uncaught exception handlers first
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

// Log startup information
console.log('Starting TML Webhook Server...');
console.error('Starting TML Webhook Server (stderr)...');
process.stdout.write('Starting TML Webhook Server (stdout)...\n');
process.stderr.write('Starting TML Webhook Server (stderr)...\n');

logger.info('Starting TML Webhook Server...', {
  nodeVersion: process.version,
  port: port,
  nodeEnv: process.env.NODE_ENV || 'development',
  pid: process.pid,
  platform: process.platform,
  arch: process.arch
});


logger.info('Configuring middleware...');

app.use(helmet());
logger.info('Helmet middleware configured');

app.use(cors());
logger.info('CORS middleware configured');

app.use(express.json());
logger.info('JSON middleware configured');

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'TML Webhook Server is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Simple ping endpoint for Azure
app.get('/ping', (req, res) => {
  console.log('=== PING ENDPOINT ===');
  console.error('=== PING ENDPOINT ERROR STREAM ===');
  process.stdout.write('=== PING ENDPOINT STDOUT ===\n');
  process.stderr.write('=== PING ENDPOINT STDERR ===\n');
  logger.info('=== PING ENDPOINT ===');
  res.status(200).send('pong');
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('=== HEALTH CHECK ===');
  logger.info('=== HEALTH CHECK ===');
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Azure Web App health check endpoint
app.get('/api/health', (req, res) => {
  console.log('=== AZURE HEALTH CHECK ===');
  logger.info('=== AZURE HEALTH CHECK ===');
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// endpoint
app.post('/webhook', (req, res) => {
  try {
    // Log raw headers
    logger.info({
      message: '=== WEBHOOK REQUEST HEADERS ===',
      headers: req.headers
    });
    
    // Log raw body
    logger.info({
      message: '=== WEBHOOK REQUEST BODY ===',
      body: req.body
    });
    
    // Log additional request details
    logger.info({
      message: '=== WEBHOOK REQUEST DETAILS ===',
      method: req.method,
      url: req.url,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      contentType: req.get('Content-Type'),
      contentLength: req.get('Content-Length')
    });
    
    const webhookData = req.body;
    logger.info({
      message: '=== PROCESSED WEBHOOK DATA ===',
      webhookData: webhookData
    });

  
    
    // Send to Unity 3D application

    
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    logger.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// endpoint
app.post('/AssetAlert', (req, res) => {
  try {
    // Log raw headers
    logger.info({
      message: '=== WEBHOOK REQUEST HEADERS ASSET ALERT ===',
      headers: req.headers
    });
    
    // Log raw body
    logger.info({
      message: '=== WEBHOOK REQUEST BODY ASSET ALERT ===',
      body: req.body
    });
    
    // Log additional request details
    logger.info({
      message: '=== WEBHOOK REQUEST DETAILS ASSET ALERT ===',
      method: req.method,
      url: req.url,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      contentType: req.get('Content-Type'),
      contentLength: req.get('Content-Length')
    });
    
    const webhookData = req.body;
    logger.info({
      message: '=== PROCESSED WEBHOOK DATA ASSET ALERT ===',
      webhookData: webhookData
    });

  
    
    // Send to Unity 3D application

    
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    logger.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

console.log('Starting server...');
logger.info('Starting server...', { port: port });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Application startup completed successfully');
  logger.info(`Server is running on port ${port}`);
  logger.info('Application startup completed successfully');
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  logger.error('Failed to start server:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
}); 