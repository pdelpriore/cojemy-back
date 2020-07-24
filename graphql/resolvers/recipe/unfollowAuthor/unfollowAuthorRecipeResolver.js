const User = require("../../../../model/User");
const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  unfollowAuthorRecipe: async ({ authorId, recipeId, userId }) => {
    try {
      await User.findOneAndUpdate(
        { _id: authorId },
        { $pull: { followers: userId } },
        { new: true }
      ).exec();

      const recipe = await Recipe.findById(recipeId).populate([
        {
          path: "author",
          select: "-password",
          model: User,
          populate: { path: "followers", select: "-password", model: User },
        },
        { path: "comments.commentator", select: "-password", model: User },
        { path: "comments.comment", model: Comment },
        { path: "comments.rate", model: Rate },
      ]);

      return recipe;
    } catch (err) {
      if (err) throw err;
    }
  },
};
