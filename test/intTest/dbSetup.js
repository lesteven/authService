const { client } = require('../../src/utils/passportQueries');
const { existUser } = require('./userData');

const clearSessions = () => {
  const query = 'TRUNCATE sessions';
  return client.execute(query);
}
const clearUsers = () => {
  const query = 'TRUNCATE accounts';
  return client.execute(query);
}

module.exports = {
  clearSessions,
  clearUsers,
}
