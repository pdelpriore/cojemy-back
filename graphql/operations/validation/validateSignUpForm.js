const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const { strings } = require("../../../strings/Strings");

const validateSignupForm = (name, email, confirmEmail, password) => {
  return new Promise((resolve, reject) => {
    if (email !== confirmEmail) {
      reject(strings.errors.validateSignupForm.EMAILS_MISMATCH);
    } else if (name.length < 5) {
      reject(strings.errors.validateSignupForm.NAME_LENGTH);
    } else if (!emailRegex.test(email)) {
      reject(strings.errors.validateSignupForm.WRONG_EMAIL);
    } else if (!passwordRegex.test(password)) {
      reject(strings.errors.validateSignupForm.WRONG_PASSWORD);
    } else {
      resolve();
    }
  });
};

module.exports = { validateSignupForm };
