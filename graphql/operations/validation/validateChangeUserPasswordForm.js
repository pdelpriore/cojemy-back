const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const { strings } = require("../../../strings/Strings");

const validateChangeUserPasswordForm = async (newPass, confirmPass) => {
  const validateResult = await new Promise((resolve, reject) => {
    try {
      if (newPass !== confirmPass) {
        reject(strings.errors.validateSignupForm.EMAILS_MISMATCH);
      } else if (!passwordRegex.test(newPass)) {
        reject(strings.errors.validateSignupForm.WRONG_PASSWORD);
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return validateResult;
};

module.exports = { validateChangeUserPasswordForm };
