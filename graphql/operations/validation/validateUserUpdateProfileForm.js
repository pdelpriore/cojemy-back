const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const validateUserUpdateProfileForm = async (name, profileImage) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (name.length < 5) {
      throw new Error(
        capitalizeFirst(strings.errors.validateSignupForm.NAME_LENGTH)
      );
    } else if (
      profileImage &&
      profileImage.imageName &&
      ![".jpg", "jpeg", ".gif", ".png", ".gif"].some((element) =>
        profileImage.imageName.includes(element)
      )
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_FORMAT)
      );
    } else if (
      profileImage &&
      profileImage.imageName &&
      [
        "xxx",
        "porn",
        "teen",
        "milf",
        "tits",
        "pussy",
        "cock",
        "sex",
        "penis",
        "cum",
        "sperme",
        "baise",
        "enculé",
        "deepthroat",
        "anal",
        "sodomie",
        "bite",
      ].some((element) => profileImage.imageName.includes(element))
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_UNACCEPTABLE)
      );
    } else if (
      profileImage &&
      new Buffer.from(
        profileImage.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ).byteLength > 101000
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_SIZE)
      );
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateUserUpdateProfileForm };
