const Recipe = require("../../../model/Recipe");
const { removeImage } = require("./removeImage");
const { uploadImage } = require("./uploadImage");

const checkRecipeImage = async (recipeId, recipeImage) => {
  const imagePath = await new Promise(async (resolve, reject) => {
    const recipe = await Recipe.findById(recipeId);
    const recipeImageName =
      recipe.picture && recipe.picture.split("/").slice(3).toString();
    if (recipeImage) {
      if (recipeImageName === recipeImage.imageName) {
        resolve(recipe.picture);
      } else {
        if (recipeImageName) {
          removeImage(recipeImageName);
        }
        const newPath = await uploadImage(recipeImage);
        resolve(newPath);
      }
    } else {
      if (recipeImageName) {
        removeImage(recipeImageName);
      }
      resolve(null);
    }
  });
  return imagePath;
};

module.exports = { checkRecipeImage };
