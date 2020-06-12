const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateRateCommentForm,
} = require("../../../operations/validation/validateRateCommentForm");

module.exports = {
  editRecipeRateComment: async (
    { recipeId, rateId, rateValue, commentId, commentContent, userId, email },
    { req }
  ) => {
    try {
      await verifyToken(userId, email, req.cookies.id);
      await validateRateCommentForm(rateValue);
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
        { path: "author", select: "-password", model: User },
        { path: "comments.commentator", select: "-password", model: User },
        { path: "comments.comment", model: Comment },
        { path: "comments.rate", model: Rate },
      ]);

      return recipeWithRateCommentUpdated;
    } catch (err) {
      if (err) throw err;
    }
  },
};
