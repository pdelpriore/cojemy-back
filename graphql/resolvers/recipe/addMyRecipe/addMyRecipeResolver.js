const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateMyRecipeForm,
} = require("../../../operations/validation/validateMyRecipeForm");
const {
  isRecipeExists,
} = require("../../../operations/verification/isRecipeExists");
const { strings } = require("../../../../strings/Strings");
const { uploadImage } = require("../../../operations/image/uploadImage");

module.exports = {
  addMyRecipe: async (
    {
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
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await isRecipeExists(title, category, email);
      await validateMyRecipeForm(
        title,
        recipeImage,
        video,
        category,
        cookTime,
        ingredients,
        description
      );
      const imagePath =
        recipeImage &&
        (await uploadImage(recipeImage, strings.imageTypes.RECIPE));

      const user = await User.findOne({ email: email });
      let recipe = new Recipe({
        title: title,
        picture: imagePath,
        video: video,
        category: category,
        cookTime: cookTime,
        ingredients: ingredients,
        description: description,
        date: new Date(),
        author: user,
        comments: [],
      });
      await recipe.save();

      await User.findOneAndUpdate(
        { email: email },
        { $push: { recipes: recipe } },
        { new: true }
      ).exec();

      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
