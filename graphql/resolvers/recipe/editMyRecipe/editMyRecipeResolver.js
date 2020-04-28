const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");
const { capitalizeFirst } = require("../../../../util/Util");
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
      email,
    },
    { req }
  ) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        const imagePath = await checkRecipeImage(recipeId, recipeImage);
        const user = await User.findOne({ email: email });

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

        const userRecipes = await Recipe.find({
          _id: { $in: user.recipes },
        })
          .sort({ date: -1 })
          .populate([
            { path: "author", model: User },
            { path: "comments.commentator", model: User },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
          ]);
        return userRecipes;
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
