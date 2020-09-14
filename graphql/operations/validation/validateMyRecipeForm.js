const { strings } = require("../../../strings/Strings");
const { unacceptableWordsArray } = require("../../../shared/testWords");
const { capitalize } = require("../../../util/Util");

const validateMyRecipeForm = (
  title,
  recipeImage,
  video,
  category,
  cookTime,
  ingredients,
  description
) => {
  return new Promise((resolve, reject) => {
    if (title.length > 21) {
      reject(strings.errors.validateMyRecipeForm.TITLE_LENGTH);
    } else if (
      unacceptableWordsArray.some((element) =>
        capitalize(title).includes(capitalize(element))
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.TITLE_UNACCEPTABLE);
    } else if (
      recipeImage &&
      ![".jpg", "jpeg", ".gif", ".png", ".gif"].some((element) =>
        recipeImage.imageName.includes(element)
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_FORMAT);
    } else if (
      recipeImage &&
      unacceptableWordsArray.some((element) =>
        recipeImage.imageName.includes(element)
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_UNACCEPTABLE);
    } else if (
      recipeImage &&
      new Buffer.from(
        recipeImage.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ).byteLength > 115000
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_SIZE);
    } else if (
      video &&
      !["http", "www"].some((element) => video.includes(element))
    ) {
      reject(strings.errors.validateMyRecipeForm.VIDEO_ERROR);
    } else if (
      video &&
      unacceptableWordsArray.some((element) => video.includes(element))
    ) {
      reject(strings.errors.validateMyRecipeForm.VIDEO_UNACCEPTABLE);
    } else if (
      ![
        "lunch",
        "desserts",
        "drinks",
        "evening",
        "salades",
        "fast food",
      ].some((element) => category.includes(element))
    ) {
      reject(strings.errors.validateMyRecipeForm.CATEGORY_ERROR);
    } else if (cookTime.toString().startsWith("0")) {
      reject(strings.errors.validateMyRecipeForm.COOK_TIME_ZERO);
    } else if (cookTime.toString().length > 3) {
      reject(strings.errors.validateMyRecipeForm.COOK_TIME_SIZE);
    } else if (cookTime > 300) {
      reject(strings.errors.validateMyRecipeForm.COOK_TIME_ERROR);
    } else if (ingredients.includes("")) {
      reject(strings.errors.validateMyRecipeForm.INGREDIENTS_ERROR);
    } else if (
      unacceptableWordsArray.some((element) =>
        capitalize(description).includes(capitalize(element))
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.DESCRIPTION_UNACCEPTABLE);
    } else {
      resolve();
    }
  });
};

module.exports = { validateMyRecipeForm };
