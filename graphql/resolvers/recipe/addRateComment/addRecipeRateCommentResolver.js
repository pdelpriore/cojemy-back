const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const {
  validateRateCommentForm,
} = require("../../../operations/validation/validateRateCommentForm");

module.exports = {
  addRecipeRateComment: async ({
    recipeId,
    rateValue,
    commentContent,
    email,
    date,
  }) => {
    try {
      await validateRateCommentForm(rateValue);
      const user = await User.findOne({ email: email });
      const recipe = await Recipe.findById(recipeId);
      const rate = new Rate({
        recipe: recipe,
        value: rateValue,
      });
      await rate.save();
      const comment = new Comment({
        recipe: recipe,
        content: commentContent,
        date: date,
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
      return recipeUpdated;
    } catch (err) {
      if (err) throw err;
    }
  },
};
