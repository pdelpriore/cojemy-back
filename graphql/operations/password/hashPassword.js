const bcrypt = require("bcrypt");

const hashPassword = (userPassword) => {
  return new Promise((resolve) => {
    bcrypt.hash(userPassword, 8, (err, hash) => {
      if (err) console.log(err);
      resolve(hash);
    });
  });
};

module.exports = { hashPassword };
