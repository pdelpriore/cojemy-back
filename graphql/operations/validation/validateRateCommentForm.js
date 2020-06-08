const { strings } = require("../../../strings/Strings");

const validateRateCommentForm = async (rateValue) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (rateValue > 5) {
      reject(strings.errors.validateRateCommentForm.RATE_VALUE);
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateRateCommentForm };
