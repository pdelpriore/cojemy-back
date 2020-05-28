const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const validateRateCommentForm = async (rateValue) => {
  const validateResult = await new Promise((resolve, reject) => {
    try {
      if (rateValue > 5) {
        reject(
          capitalizeFirst(strings.errors.validateRateCommentForm.RATE_VALUE)
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

module.exports = { validateRateCommentForm };
