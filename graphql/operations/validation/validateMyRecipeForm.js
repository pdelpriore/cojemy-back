const { strings } = require("../../../strings/Strings");
const { unacceptableWordsArray } = require("../../../shared/testWords");
const { capitalizeFirst } = require("../../../util/Util");

const validateMyRecipeForm = async (
  title,
  recipeImage,
  video,
  category,
  cookTime,
  ingredients,
  description
) => {
  const validateResult = await new Promise((resolve, reject) => {
    if (title.length > 21) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.TITLE_LENGTH)
      );
    } else if (
      unacceptableWordsArray.some(
        (element) =>
          title.includes(element) || title.includes(capitalizeFirst(element))
      )
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.TITLE_UNACCEPTABLE)
      );
    } else if (
      recipeImage &&
      ![".jpg", "jpeg", ".gif", ".png", ".gif"].some((element) =>
        recipeImage.imageName.includes(element)
      )
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_FORMAT)
      );
    } else if (
      recipeImage &&
      unacceptableWordsArray.some((element) =>
        recipeImage.imageName.includes(element)
      )
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_UNACCEPTABLE)
      );
    } else if (
      recipeImage &&
      new Buffer.from(
        recipeImage.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ).byteLength > 101000
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.IMAGE_SIZE)
      );
    } else if (
      video &&
      !["http", "www"].some((element) => video.includes(element))
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.VIDEO_ERROR)
      );
    } else if (
      video &&
      unacceptableWordsArray.some((element) => video.includes(element))
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.VIDEO_UNACCEPTABLE)
      );
    } else if (
      ![
        "lunch",
        "desserts",
        "boissons",
        "soirée",
        "salades",
        "fast food",
      ].some((element) => category.includes(element))
    ) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.CATEGORY_ERROR)
      );
    } else if (cookTime.toString().startsWith("0")) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.COOK_TIME_ZERO)
      );
    } else if (cookTime > 300) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.COOK_TIME_ERROR)
      );
    } else if (ingredients.includes("")) {
      throw new Error(
        capitalizeFirst(strings.errors.validateMyRecipeForm.INGREDIENTS_ERROR)
      );
    } else if (
      unacceptableWordsArray.some((element) => description.includes(element))
    ) {
      throw new Error(
        capitalizeFirst(
          strings.errors.validateMyRecipeForm.DESCRIPTION_UNACCEPTABLE
        )
      );
    } else {
      resolve();
    }
  });
  return validateResult;
};

module.exports = { validateMyRecipeForm };
