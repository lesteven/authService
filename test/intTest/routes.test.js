const app = require('../../src/app');
const request = require('supertest');

describe('unknown routes', () => {
  it('should give error', () => {
    return request(app)
      .get('/unknown')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        status: 404,
        error: 'This page does not exist'
      })
  });
})
