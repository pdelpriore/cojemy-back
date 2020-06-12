const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
const { strings } = require("../../../strings/Strings");

const validateCustomerContactForm = (email) => {
  return new Promise((resolve, reject) => {
    if (!emailRegex.test(email)) {
      reject(strings.errors.validateSignupForm.WRONG_EMAIL);
    } else {
      resolve();
    }
  });
};

module.exports = { validateCustomerContactForm };
