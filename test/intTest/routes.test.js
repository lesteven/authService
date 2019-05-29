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

const err = {
  hello: 'error'
};

describe('throw error', () => {
  it('when given empty body to /api/users', () => {
    return request(app)
      .post('/api/users')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
  })
  it('when given wrong params to /api/users', () => {
    return request(app)
      .post('/api/users')
      .send(err)
      .set('Accept', 'application/json')
      .expect(400)
  })
  it('when given empty body to /api/sessions', () => {
    return request(app)
      .post('/api/sessions')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
  })
  it('when given wrong params to /api/sessions', () => {
    return request(app)
      .post('/api/sessions')
      .send(err)
      .set('Accept', 'application/json')
      .expect(400)
  })
});
