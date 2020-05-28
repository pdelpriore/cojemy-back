const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const validateChangeUserPasswordForm = async (newPass, confirmPass) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (newPass !== confirmPass) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.EMAILS_MISMATCH)
      );
    } else if (!passwordRegex.test(newPass)) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.WRONG_PASSWORD)
      );
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateChangeUserPasswordForm };
