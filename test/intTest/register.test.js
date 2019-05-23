const app = require('../../src/app');
const request = require('supertest');


const data = {
  username: 'hello',
  password: 'lala123',
}

describe('register service', () => {
  it('add user to db if user doesnt exist', () => {
    return request(app)
      .post('/api/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
  });
  it('send error if user already exist', () => {
    return request(app)
      .post('/api/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
  });
  it('delete user if logged in', () => {
    return request(app)
      .delete('/api/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
  });
});
