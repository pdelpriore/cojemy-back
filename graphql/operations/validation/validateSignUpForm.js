const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const validateSignupForm = async (name, email, confirmEmail, password) => {
  const validateResult = await new Promise((resolve, reject) => {
    try {
      if (email !== confirmEmail) {
        reject(
          capitalizeFirst(strings.errors.validateSignupForm.EMAILS_MISMATCH)
        );
      } else if (name.length < 5) {
        reject(capitalizeFirst(strings.errors.validateSignupForm.NAME_LENGTH));
      } else if (!emailRegex.test(email)) {
        reject(capitalizeFirst(strings.errors.validateSignupForm.WRONG_EMAIL));
      } else if (!passwordRegex.test(password)) {
        reject(
          capitalizeFirst(strings.errors.validateSignupForm.WRONG_PASSWORD)
        );
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return validateResult;
};

module.exports = { validateSignupForm };
