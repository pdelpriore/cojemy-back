const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");

const isUserExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        resolve(user);
      } else if (user === null) {
        reject(strings.errors.remindPass.USER_NULL);
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { isUserExist };
