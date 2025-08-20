require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

// Log startup information
logger.info('Starting TML Webhook Server...', {
  nodeVersion: process.version,
  port: port,
  nodeEnv: process.env.NODE_ENV || 'development'
});


app.use(helmet());
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'TML Webhook Server is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  logger.info('=== HEALTH CHECK ===');
  res.status(200).json({ status: 'healthy' });
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

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}).on('error', (err) => {
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