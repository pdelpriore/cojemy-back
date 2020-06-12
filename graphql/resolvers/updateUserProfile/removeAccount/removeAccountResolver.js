const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { removeImage } = require("../../../operations/image/removeImage");
const { strings } = require("../../../../strings/Strings");
const { userGooglePhoto } = require("../../../../shared/testWords");

module.exports = {
  removeAccount: async ({ userId, email }, { req }) => {
    try {
      await verifyToken(userId, email, req.cookies.id);
      const user = await User.findOne({ email: email });
      if (
        user.photo &&
        !userGooglePhoto.some(
          (element) => user.photo && user.photo.includes(element)
        )
      )
        removeImage(
          user.photo.split("/").slice(3).toString(),
          strings.imageTypes.USER
        );
      if (user.recipes.length > 0) {
        let recipes = await Recipe.find({ _id: { $in: user.recipes } });
        let recipesWithPicture = recipes.filter(
          (recipe) => recipe.picture !== null && recipe.picture !== undefined
        );
        recipesWithPicture.forEach((recipe) => {
          removeImage(
            recipe.picture.split("/").slice(3).toString(),
            strings.imageTypes.RECIPE
          );
        });
        await Recipe.deleteMany({ _id: { $in: user.recipes } });
      }

      let recipesCommentedAndRatedByUser = await Recipe.find({
        "comments.commentator": user._id,
      });
      if (recipesCommentedAndRatedByUser.length > 0) {
        let recipeIds = recipesCommentedAndRatedByUser.map(
          (recipe) => recipe._id
        );
        recipesCommentedAndRatedByUser.forEach(async (recipe) => {
          let commentIds = recipe.comments.map((item) => item._id);
          let recipeComments = recipe.comments.map((item) => item.comment);
          let recipeRates = recipe.comments.map((item) => item.rate);

          await Comment.deleteMany({ _id: { $in: recipeComments } });
          await Rate.deleteMany({ _id: { $in: recipeRates } });
          await Recipe.updateMany(
            { _id: { $in: recipeIds } },
            { $pull: { comments: { $in: commentIds } } }
          );
        });
      }

      await User.findOneAndRemove({ email: email });
      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
