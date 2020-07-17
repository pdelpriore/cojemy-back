const User = require("../../../../model/User");
const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  followAuthorRecipe: async (
    { authorId, recipeId, userId, email },
    { req }
  ) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await User.findOneAndUpdate(
        { _id: authorId },
        { $push: { followers: userId } },
        { new: true }
      ).exec();

      const recipe = await Recipe.findById(recipeId).populate([
        { path: "author", select: "-password", model: User },
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
