const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const isUserExist = async email => {
  const result = await new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        resolve(user);
      } else if (user === null) {
        reject(capitalizeFirst(strings.errors.remindPass.USER_NULL));
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return result;
};

module.exports = { isUserExist };
