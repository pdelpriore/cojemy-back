const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const { strings } = require("../../../strings/Strings");

const validateNewPassForm = async (email) => {
  const validateResult = await new Promise((resolve, reject) => {
    try {
      if (!emailRegex.test(email)) {
        reject(strings.errors.validateSignupForm.WRONG_EMAIL);
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return validateResult;
};

module.exports = { validateNewPassForm };
