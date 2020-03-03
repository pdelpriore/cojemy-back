const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");
const bcrypt = require("bcrypt");

const isPasswordCorrect = async (email, password) => {
  const result = await new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        bcrypt.compare(password, user.password, (err, comparison) => {
          if (comparison) {
            resolve();
          } else {
            reject(capitalizeFirst(strings.errors.login.WRONG_PASSWORD));
          }
        });
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return result;
};

module.exports = { isPasswordCorrect };
