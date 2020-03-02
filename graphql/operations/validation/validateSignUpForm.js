const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const nameSpaceRegex = /^[^\s]+$/;
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const validateSignupForm = async (name, email, confirmEmail, password) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (email !== confirmEmail) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.EMAILS_MISMATCH)
      );
    } else if (name.length < 5) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.NAME_LENGTH)
      );
    } else if (!nameSpaceRegex.test(name)) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.NAME_SPACE)
      );
    } else if (!emailRegex.test(email)) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.WRONG_EMAIL)
      );
    } else if (!passwordRegex.test(password)) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.WRONG_PASSWORD)
      );
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateSignupForm };
