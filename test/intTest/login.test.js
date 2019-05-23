const app = require('../../src/app');
const request = require('supertest');


const data = {
  username: 'hello',
  password: 'lala123',
}

describe('login service', () => {
  it('log user in if correct user and pw', () => {
    return request(app)
      .post('/api/sessions')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
  });
  it('send error if user doesnt exist', () => {
    return request(app)
      .post('/api/sessions')
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
  });
  it('send error if incorrect password', () => {
    return request(app)
      .post('/api/sessions')
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
  });
});
