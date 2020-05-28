const { strings } = require("../../../strings/Strings");
const { unacceptableWordsArray } = require("../../../shared/testWords");
const { capitalizeFirst } = require("../../../util/Util");

const validateUserUpdateProfileForm = async (name, profileImage) => {
  const validateResult = await new Promise((resolve, reject) => {
    try {
      if (name.length < 5) {
        reject(capitalizeFirst(strings.errors.validateSignupForm.NAME_LENGTH));
      } else if (
        profileImage &&
        profileImage.imageName &&
        ![".jpg", "jpeg", ".gif", ".png", ".gif"].some((element) =>
          profileImage.imageName.includes(element)
        )
      ) {
        reject(
          capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_FORMAT)
        );
      } else if (
        profileImage &&
        profileImage.imageName &&
        unacceptableWordsArray.some((element) =>
          profileImage.imageName.includes(element)
        )
      ) {
        reject(
          capitalizeFirst(
            strings.errors.validateMyRecipeForm.IMAGE_UNACCEPTABLE
          )
        );
      } else if (
        profileImage &&
        new Buffer.from(
          profileImage.image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ).byteLength > 101000
      ) {
        reject(capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_SIZE));
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return validateResult;
};

module.exports = { validateUserUpdateProfileForm };
