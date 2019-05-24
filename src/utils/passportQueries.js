const cassandra = require('cassandra-driver');
const uuid = require('uuid/v4');
const { hashPassword } = require('./encrypt');
const config = require('../../config/index');

const client = new cassandra.Client({
  contactPoints: config.contactPoints,
  localDataCenter: 'datacenter1',
  keyspace: 'users'
});

const insertUser = async (data) => {
  const query = 'INSERT INTO accounts \
    (id, created_at, password, username) VALUES (?, ?, ?, ?)';

  const { username, password } = data;
  const hashedPw = await hashPassword(password);
  const params = [uuid(), Date.now(), hashedPw, username];

  return client.execute(query, params);
}

const findUser = (data) => {
  const query = 'SELECT username FROM accounts \
    WHERE username = ?';
  const params = [ data.username ];
  return client.execute(query, params);
}

const userAvail = async (data) => {
  const result = await findUser(data);
  return result.rowLength === 0;
}

const deleteUser = (data) => {
  const query = 'DELETE FROM accounts WHERE \
    username = ?'
  const params = [ data.username ];
  return client.execute(query, params);
}

module.exports = {
  client,
  insertUser,
  findUser,
  deleteUser,
  userAvail
}
