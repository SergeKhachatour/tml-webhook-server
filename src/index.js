require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy xxx' });
});

// endpoint
app.post('/webhook', (req, res) => {
  try {
    // Log raw headers
    logger.info('=== WEBHOOK REQUEST HEADERS ===');
    logger.info('Headers:', JSON.stringify(req.headers, null, 2));
    
    // Log raw body
    logger.info('=== WEBHOOK REQUEST BODY ===');
    logger.info('Raw body:', JSON.stringify(req.body, null, 2));
    
    // Log additional request details
    logger.info('=== WEBHOOK REQUEST DETAILS ===');
    logger.info('Method:', req.method);
    logger.info('URL:', req.url);
    logger.info('IP Address:', req.ip);
    logger.info('User Agent:', req.get('User-Agent'));
    logger.info('Content-Type:', req.get('Content-Type'));
    logger.info('Content-Length:', req.get('Content-Length'));
    
    const webhookData = req.body;
    logger.info('=== PROCESSED WEBHOOK DATA ===');
    logger.info('Processed webhook data:', webhookData);
    
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
}); 