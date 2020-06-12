const Recipe = require("../../../../model/Recipe");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateMyRecipeForm,
} = require("../../../operations/validation/validateMyRecipeForm");
const {
  checkRecipeImage,
} = require("../../../operations/image/checkRecipeImage");

module.exports = {
  editMyRecipe: async (
    {
      recipeId,
      title,
      recipeImage,
      video,
      category,
      cookTime,
      ingredients,
      description,
      userId,
      email,
    },
    { req }
  ) => {
    try {
      await verifyToken(userId, email, req.cookies.id);
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
