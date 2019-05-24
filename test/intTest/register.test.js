const app = require('../../src/app');
const request = require('supertest');
const {
  insertUser,
  deleteUser
} = require('../../src/utils/passportQueries');

const existUser = {
  username: 'helloExists',
  password: 'adasdas'
}

const newUser = {
  username: 'hello',
  password: 'lala123',
}

beforeAll(() => {
  insertUser(existUser);
})

afterEach(() => {
  deleteUser(newUser);
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

