const app = require('../../src/app');
const request = require('supertest');
const {
  insertUser,
  deleteUser,
} = require('../../src/utils/passportQueries');
const { clearSessions, clearUsers } = require('./dbSetup');
const { existUser, existWrong, newUser } = require('./userData');

beforeAll(() => {
  clearUsers();
  insertUser(existUser);
})

afterEach(() => {
  deleteUser(newUser);
});

afterAll(() => {
  clearSessions();
  deleteUser(existUser);
});

describe('register service', () => {
  it('add user to db if user doesnt exist', () => {
    return request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201)
  });
  it('send error if user already exist', () => {
    return request(app)
      .post('/api/users')
      .send(existUser)
      .set('Accept', 'application/json')
      .expect(400)

  });
  /*
  it('delete user if logged in', () => {
    return request(app)
      .delete(`/api/users/${data.username}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
  });
  */
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
