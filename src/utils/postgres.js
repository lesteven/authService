const pgp = require('pg-promise')();
const http = require('http');
const debug = require('debug')('http');

const connection = {
  database: 'auth',
}

const db = pgp(connection);
/*
const auth = (jwt_payload, done) => {
  try {
    const user = await db.any('SELECT * FROM users WHERE id = $1', 
      [jwt_payload.sub]);
    if (user) {

    } else {

    }
  } catch(e) {
    debug(e);
  }
};
*/
