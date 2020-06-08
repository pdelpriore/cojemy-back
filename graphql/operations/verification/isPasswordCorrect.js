const { strings } = require("../../../strings/Strings");
const bcrypt = require("bcrypt");

const isPasswordCorrect = async (password, hashedPassword) => {
  const result = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, comparison) => {
      if (comparison) {
        resolve();
      } else {
        reject(strings.errors.login.WRONG_PASSWORD);
      }
    });
  });
  return result;
};

module.exports = { isPasswordCorrect };
