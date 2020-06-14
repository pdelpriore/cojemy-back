const { strings } = require("../../../strings/Strings");

const validateRateCommentForm = (rateValue) => {
  return new Promise((resolve, reject) => {
    if (rateValue > 5) {
      reject(strings.errors.validateRateCommentForm.RATE_VALUE);
    } else {
      resolve();
    }
  });
};

module.exports = { validateRateCommentForm };
