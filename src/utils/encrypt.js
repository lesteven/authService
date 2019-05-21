const bcrypt = require('bcrypt');

const saltRounds = 15;

const hashPassword = (plainPassword) => {
  const hashedPassword = bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

const validatePassword = (plainPW, hashedPW) => {
  const validated = bcrypt.compare(plainPW, hashedPW);
  return validated;
};

module.exports = {
  hashPassword,
  validatePassword
}
