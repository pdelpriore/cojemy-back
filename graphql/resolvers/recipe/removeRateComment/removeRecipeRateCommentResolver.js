const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  removeRecipeRateComment: async ({
    rateId,
    commentId,
    recipeId,
    commentItemId,
  }) => {
    try {
      await Rate.findOneAndRemove({ _id: rateId });
      await Comment.findOneAndRemove({ _id: commentId });

      const recipeWithRateCommentRemoved = await Recipe.findOneAndUpdate(
        { _id: recipeId },
        { $pull: { comments: { _id: commentItemId } } },
        { new: true }
      )
        .populate([
          {
            path: "author",
            select: "-password",
            model: User,
            populate: { path: "followers", select: "-password", model: User },
          },
          { path: "comments.commentator", select: "-password", model: User },
          { path: "comments.comment", model: Comment },
          { path: "comments.rate", model: Rate },
        ])
        .exec();

      return recipeWithRateCommentRemoved;
    } catch (err) {
      if (err) throw err;
    }
  },
};
