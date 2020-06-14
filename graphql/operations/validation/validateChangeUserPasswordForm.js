const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const { strings } = require("../../../strings/Strings");

const validateChangeUserPasswordForm = (newPass, confirmPass) => {
  return new Promise((resolve, reject) => {
    if (newPass !== confirmPass) {
      reject(strings.errors.validateSignupForm.EMAILS_MISMATCH);
    } else if (!passwordRegex.test(newPass)) {
      reject(strings.errors.validateSignupForm.WRONG_PASSWORD);
    } else {
      resolve();
    }
  });
};

module.exports = { validateChangeUserPasswordForm };
