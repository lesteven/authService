const cassandra = require('cassandra-driver');
const uuid = require('uuid/v4');
const { hashPassword } = require('./encrypt');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'users'
});

const insertUser = async (data) => {
  const query = 'INSERT INTO accounts \
    (id, created_at, password, username) VALUES (?, ?, ?, ?)';
  const { username, password } = data;
  const hashedPw = await hashPassword(password);
  const params = [uuid(), Date.now(), hashedPw, username];
  console.log(params);
  const result = await client.execute(query, params);
  console.log(result);
}

const userAvail = async (data) => {
  const query = 'SELECT username FROM accounts \
    WHERE username = ?';
  const params = [ data.username ];
  const result = await client.execute(query, params);
  return result.rowLength === 0;
}

module.exports = {
  insertUser,
  userAvail
}
