const bcrypt = require("bcrypt");

const hashPassword = userPassword => {
  bcrypt.genSalt(8, (err, salt) => {
    bcrypt.hash(userPassword, salt, (err, hash) => {
      return hash;
    });
  });
};

module.exports = { hashPassword };
