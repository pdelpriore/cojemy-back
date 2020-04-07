const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");
const { capitalizeFirst } = require("../../../../util/Util");

module.exports = {
  addRecipeRateComment: async (
    { recipeId, rateValue, commentContent, email },
    { req }
  ) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
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
            { path: "author", model: User },
            { path: "comments.commentator", model: User },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
          ])
          .exec();
        return recipeUpdated;
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
