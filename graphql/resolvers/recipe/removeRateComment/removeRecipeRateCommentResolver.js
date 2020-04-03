const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");
const { capitalizeFirst } = require("../../../../util/Util");

module.exports = {
  removeRecipeRateComment: async (
    { rateId, commentId, recipeId, commentItemId, email },
    { req }
  ) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        await Rate.findOneAndRemove({ _id: rateId });
        await Comment.findOneAndRemove({ _id: commentId });

        const recipeWithRateCommentRemoved = await Recipe.findOneAndUpdate(
          { _id: recipeId },
          { $pull: { comments: { _id: commentItemId } } },
          { new: true }
        )
          .populate([
            { path: "author", model: User },
            { path: "comments.commentator", model: User },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate }
          ])
          .exec();

        return recipeWithRateCommentRemoved;
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};
