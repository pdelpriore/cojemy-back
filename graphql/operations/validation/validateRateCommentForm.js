const { strings } = require("../../../strings/Strings");

const validateRateCommentForm = async (rateValue) => {
  const validateResult = await new Promise((resolve, reject) => {
    try {
      if (rateValue > 5) {
        reject(strings.errors.validateRateCommentForm.RATE_VALUE);
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return validateResult;
};

module.exports = { validateRateCommentForm };
