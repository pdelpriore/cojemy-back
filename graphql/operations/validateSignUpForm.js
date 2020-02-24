const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const nameSpaceRegex = /^[^\s]+$/;
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const validateSignupForm = async (name, email, password) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (name.length < 5) {
      reject(capitalizeFirst(strings.errors.validateSignupForm.NAME_LENGTH));
    } else if (!nameSpaceRegex.test(name)) {
      reject(capitalizeFirst(strings.errors.validateSignupForm.NAME_SPACE));
    } else if (!emailRegex.test(email)) {
      reject(capitalizeFirst(strings.errors.validateSignupForm.WRONG_EMAIL));
    } else if (!passwordRegex.test(password)) {
      reject(capitalizeFirst(strings.errors.validateSignupForm.WRONG_PASSWORD));
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateSignupForm };
