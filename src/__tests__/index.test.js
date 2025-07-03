const request = require('supertest');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Create a test app
const app = express();

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
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

describe('Health Check Endpoint', () => {
  it('should return 200 and healthy status', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ status: 'healthy' });
  });
});

describe('Webhook Endpoint', () => {
  it('should return 200 for valid webhook data', async () => {
    const testData = { test: 'data' };
    const response = await request(app)
      .post('/webhook')
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ message: 'Webhook received successfully' });
  });
}); 