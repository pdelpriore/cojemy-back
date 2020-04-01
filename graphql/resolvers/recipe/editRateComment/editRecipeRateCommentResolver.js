const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");
const { capitalizeFirst } = require("../../../../util/Util");

module.exports = {
  editRecipeRateComment: async (
    { recipeId, rateId, rateValue, commentId, commentContent, email },
    { req }
  ) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        await Rate.findOneAndUpdate(
          { _id: rateId },
          { $set: { value: rateValue } },
          { new: true }
        ).exec();
        await Comment.findOneAndUpdate(
          { _id: commentId },
          { $set: { content: commentContent } },
          { new: true }
        ).exec();

        const recipeWithRateCommentUpdated = await Recipe.findById(
          recipeId
        ).populate([
          { path: "author", model: User },
          { path: "comments.commentator", model: User },
          { path: "comments.comment", model: Comment },
          { path: "comments.rate", model: Rate }
        ]);

        return recipeWithRateCommentUpdated;
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};
