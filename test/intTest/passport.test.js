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


afterAll(() => {
  clearSessions();
  deleteUser(existUser);
  deleteUser(newUser);
});

//use agent to save cookies from logging in
const agent = request.agent(app);

describe('register service', () => {
  it('add user to db if user doesnt exist', () => {
    return agent
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
  it('should not delete other users', () => {
    return agent
      .delete(`/api/users/${existUser.username}`)
      .expect(401)
  });
  it('delete user if logged in', () => {
    return agent
      .delete(`/api/users/${newUser.username}`)
      .expect(200)
  });
});


describe('login service', () => {
  it('log user in if correct user and pw', () => {
    return agent
      .post('/api/sessions')
      .send(existUser)
      .expect('set-cookie', /connect.sid/)
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
  it('should not delete other users', () => {
    return agent
      .delete(`/api/sessions/${newUser.username}`)
      .expect(401)
  });
  it('delete user', () => {
    return agent
      .delete(`/api/sessions/${existUser.username}`)
      .expect(200)
  });
  
});
