const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const isEmailConfirmed = async email => {
  const result = await new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      if (user.isEmailConfirmed) {
        resolve();
      } else {
        reject(capitalizeFirst(strings.errors.login.EMAIL_UNCONFIRMED));
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return result;
};

module.exports = { isEmailConfirmed };
