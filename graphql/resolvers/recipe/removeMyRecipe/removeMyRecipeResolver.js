const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { removeImage } = require("../../../operations/image/removeImage");
const { strings } = require("../../../../strings/Strings");
const { capitalizeFirst } = require("../../../../util/Util");

module.exports = {
  removeMyRecipe: async ({ recipeId, email }, { req }) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        const recipe = await Recipe.findById(recipeId);
        const recipeImageName =
          recipe.picture && recipe.picture.split("/").slice(3).toString();
        if (recipeImageName) removeImage(recipeImageName);

        let recipeComments = recipe.comments.map((item) => item.comment);
        let recipeRates = recipe.comments.map((item) => item.rate);

        await Comment.deleteMany({ _id: { $in: recipeComments } });
        await Rate.deleteMany({ _id: { $in: recipeRates } });
        await Recipe.findOneAndRemove({ _id: recipeId });

        const user = await User.findOneAndUpdate(
          { email: email },
          { $pull: { recipes: recipeId } },
          { new: true }
        ).exec();
        if (user.recipes.length > 0) {
          let myRecipes = await Recipe.find({ _id: { $in: user.recipes } })
            .sort({ date: -1 })
            .populate([
              { path: "author", model: User },
              { path: "comments.commentator", model: User },
              { path: "comments.comment", model: Comment },
              { path: "comments.rate", model: Rate },
            ]);
          return myRecipes;
        } else {
          throw new Error(
            capitalizeFirst(strings.errors.retrieveRecipes.NO_RECIPES)
          );
        }
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
