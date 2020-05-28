const { strings } = require("../../../strings/Strings");

const isEmailConfirmed = async (isEmailConfirmed) => {
  const result = await new Promise((resolve, reject) => {
    try {
      if (isEmailConfirmed) {
        resolve();
      } else {
        reject(strings.errors.login.EMAIL_UNCONFIRMED);
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return result;
};

module.exports = { isEmailConfirmed };
