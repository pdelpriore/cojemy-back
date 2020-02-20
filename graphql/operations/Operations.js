const bcrypt = require("bcrypt");

const hashPassword = async userPassword => {
  const passwordHashed = await new Promise((resolve, reject) => {
    bcrypt.hash(userPassword, 8, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return passwordHashed;
};

module.exports = { hashPassword };
