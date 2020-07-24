const Recipe = require("../../../../model/Recipe");
const {
  validateMyRecipeForm,
} = require("../../../operations/validation/validateMyRecipeForm");
const {
  checkRecipeImage,
} = require("../../../operations/image/checkRecipeImage");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  editMyRecipe: async ({
    recipeId,
    title,
    recipeImage,
    video,
    category,
    cookTime,
    ingredients,
    description,
  }) => {
    try {
      await validateMyRecipeForm(
        title,
        recipeImage,
        video,
        category,
        cookTime,
        ingredients,
        description
      );
      const imagePath = await checkRecipeImage(recipeId, recipeImage);

      await Recipe.findOneAndUpdate(
        { _id: recipeId },
        {
          $set: {
            title: title,
            picture: imagePath,
            video: video,
            category: category,
            cookTime: cookTime,
            ingredients: ingredients,
            description: description,
          },
        },
        { new: true }
      ).exec();

      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
