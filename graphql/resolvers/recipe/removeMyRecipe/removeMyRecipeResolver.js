const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { removeImage } = require("../../../operations/image/removeImage");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  removeMyRecipe: async ({ recipeId, email }, { req }) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        const recipe = await Recipe.findById(recipeId);
        const recipeImageName =
          recipe.picture && recipe.picture.split("/").slice(3).toString();
        if (recipeImageName)
          removeImage(recipeImageName, strings.imageTypes.RECIPE);

        if (recipe.comments.length > 0) {
          let recipeComments = recipe.comments.map((item) => item.comment);
          let recipeRates = recipe.comments.map((item) => item.rate);

          await Comment.deleteMany({ _id: { $in: recipeComments } });
          await Rate.deleteMany({ _id: { $in: recipeRates } });
        }

        await Recipe.findOneAndRemove({ _id: recipeId });

        await User.findOneAndUpdate(
          { email: email },
          { $pull: { recipes: recipeId } },
          { new: true }
        ).exec();

        return true;
      } else {
        throw new Error(strings.errors.token.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
