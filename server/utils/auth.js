const bcrypt = require('bcrypt')

function HashPassword(userInputPassword) {

    return bcrypt.genSalt(parseInt(process.env.SALTROUNDS))
      .then((salt) => {
        return bcrypt.hash(userInputPassword, salt)
      })
      .then((hash) => {
        return hash
      })
  }

function comparePassword(userInputPassword, hashedPassword) {
    return bcrypt.compare(userInputPassword, hashedPassword)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return false;
      });
  }

module.exports = {HashPassword, comparePassword}