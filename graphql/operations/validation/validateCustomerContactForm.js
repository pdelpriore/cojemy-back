const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const { strings } = require("../../../strings/Strings");

const validateCustomerContactForm = async (email) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (!emailRegex.test(email)) {
      throw new Error(strings.errors.validateSignupForm.WRONG_EMAIL);
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateCustomerContactForm };
