const app = require('../../src/app');
const request = require('supertest');
const {
  insertUser,
  deleteUser
} = require('../../src/utils/passportQueries');
const { existUser, existWrong, newUser } = require('./userData');

beforeAll(() => {
  insertUser(existUser);
})

afterEach(() => {
  deleteUser(newUser);
});


describe('login service', () => {
  it('log user in if correct user and pw', () => {
    return request(app)
      .post('/api/sessions')
      .send(existUser)
      .set('Accept', 'application/json')
      .expect(201)
  });
  it('send error if user doesnt exist', () => {
    return request(app)
      .post('/api/sessions')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(400)
  });
  it('send error if incorrect password', () => {
    return request(app)
      .post('/api/sessions')
      .send(existWrong)
      .set('Accept', 'application/json')
      .expect(400)
  });
});
