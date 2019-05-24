const bcrypt = require('bcrypt');


const hashPassword = (plainPassword) => {
  const saltRounds = 15;
  return bcrypt.hash(plainPassword, saltRounds);
};

const validatePassword = (plainPW, hashedPW) => {
  const validated = bcrypt.compare(plainPW, hashedPW);
  return validated;
};

module.exports = {
  hashPassword,
  validatePassword
}
