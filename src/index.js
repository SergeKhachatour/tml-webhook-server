require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  try {
    const webhookData = req.body;
    logger.info('Received webhook:', webhookData);
    
    // TODO: Add your webhook processing logic here
    
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    logger.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 