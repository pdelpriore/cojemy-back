const { strings } = require("../../../strings/Strings");
const { unacceptableWordsArray } = require("../../../shared/testWords");

const validateUserUpdateProfileForm = (name, profileImage) => {
  return new Promise((resolve, reject) => {
    if (name.length < 5) {
      reject(strings.errors.validateSignupForm.NAME_LENGTH);
    } else if (
      profileImage &&
      profileImage.imageName &&
      ![".jpg", "jpeg", ".gif", ".png", ".gif"].some((element) =>
        profileImage.imageName.includes(element)
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_FORMAT);
    } else if (
      profileImage &&
      profileImage.imageName &&
      unacceptableWordsArray.some((element) =>
        profileImage.imageName.includes(element)
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_UNACCEPTABLE);
    } else if (
      profileImage &&
      new Buffer.from(
        profileImage.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ).byteLength > 115000
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_SIZE);
    } else {
      resolve();
    }
  });
};

module.exports = { validateUserUpdateProfileForm };
