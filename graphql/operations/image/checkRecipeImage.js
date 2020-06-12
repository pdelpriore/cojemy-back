const Recipe = require("../../../model/Recipe");
const { removeImage } = require("./removeImage");
const { uploadImage } = require("./uploadImage");
const { strings } = require("../../../strings/Strings");

const checkRecipeImage = (recipeId, recipeImage) => {
  return new Promise(async (resolve) => {
    try {
      const recipe = await Recipe.findById(recipeId);
      const recipeImageName =
        recipe.picture && recipe.picture.split("/").slice(3).toString();
      if (recipeImage) {
        if (recipeImageName === recipeImage.imageName) {
          resolve(recipe.picture);
        } else {
          if (recipeImageName) {
            removeImage(recipeImageName, strings.imageTypes.RECIPE);
          }
          const newPath = await uploadImage(
            recipeImage,
            strings.imageTypes.RECIPE
          );
          resolve(newPath);
        }
      } else {
        if (recipeImageName) {
          removeImage(recipeImageName, strings.imageTypes.RECIPE);
        }
        resolve(null);
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { checkRecipeImage };
