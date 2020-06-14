const { strings } = require("../../../strings/Strings");
const bcrypt = require("bcrypt");

const isPasswordCorrect = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, comparison) => {
      if (comparison) {
        resolve();
      } else {
        reject(strings.errors.login.WRONG_PASSWORD);
      }
    });
  });
};

module.exports = { isPasswordCorrect };
