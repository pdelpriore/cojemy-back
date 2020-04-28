const Recipe = require("../../../model/Recipe");
const fs = require("fs");
const path = require("path");
const { uploadImage } = require("./uploadImage");

const checkRecipeImage = async (recipeId, recipeImage) => {
  const imagePath = await new Promise(async (resolve, reject) => {
    const recipe = await Recipe.findById(recipeId);
    const recipeImageName =
      recipe.picture && recipe.picture.split("/").slice(3).toString();
    if (recipeImageName === recipeImage && recipeImage.imageName) {
      resolve(recipe.picture);
    } else {
      recipeImageName &&
        fs.unlink(
          path.join(
            __dirname,
            "..",
            "..",
            "..",
            "uploads",
            "imgs",
            "recipes",
            `${recipeImageName}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );
      const newPath = recipeImage && (await uploadImage(recipeImage));
      resolve(newPath);
    }
  });
  return imagePath;
};

module.exports = { checkRecipeImage };
