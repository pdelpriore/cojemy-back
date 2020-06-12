const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateRateCommentForm,
} = require("../../../operations/validation/validateRateCommentForm");

module.exports = {
  addRecipeRateComment: async (
    { recipeId, rateValue, commentContent, userId, email },
    { req }
  ) => {
    try {
      await verifyToken(userId, email, req.cookies.id);
      await validateRateCommentForm(rateValue);
      const user = await User.findOne({ email: email });
      const recipe = await Recipe.findById(recipeId);
      let rate = new Rate({
        recipe: recipe,
        value: rateValue,
      });
      await rate.save();
      let comment = new Comment({
        recipe: recipe,
        content: commentContent,
        date: new Date(),
      });
      await comment.save();
      const recipeUpdated = await Recipe.findOneAndUpdate(
        { _id: recipeId },
        {
          $push: {
            comments: { commentator: user, comment: comment, rate: rate },
          },
        },
        { new: true }
      )
        .populate([
          { path: "author", select: "-password", model: User },
          { path: "comments.commentator", select: "-password", model: User },
          { path: "comments.comment", model: Comment },
          { path: "comments.rate", model: Rate },
        ])
        .exec();
      return recipeUpdated;
    } catch (err) {
      if (err) throw err;
    }
  },
};
