const request = require('supertest');
const express = require('express');
const app = express();

// Import the app configuration
require('../index');

describe('Health Check Endpoint', () => {
  it('should return 200 and healthy status', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ status: 'healthy' });
  });
}); 