const app = require('../../src/app');
const request = require('supertest');

// return b/c of supertest; cleaner looking test
describe('server', () => {
  it('should give response', () => {
    return request(app)
      .get('/')
      .expect(200)
  })
});
