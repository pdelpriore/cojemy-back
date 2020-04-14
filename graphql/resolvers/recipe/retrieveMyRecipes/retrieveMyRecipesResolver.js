const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const Rate = require("../../../../model/Rate");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  retrieveMyRecipes: async ({ authorId, email }, { req }) => {
    const tokenVerified = await verifyToken(email, req.cookies.id);
    if (tokenVerified) {
      try {
        const myRecipes = await Recipe.find({ author: authorId })
          .sort({ date: -1 })
          .populate([
            { path: "author", model: User },
            { path: "comments.commentator", model: User },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
          ]);
        if (myRecipes.length > 0) {
          return myRecipes;
        } else {
          throw new Error(
            capitalizeFirst(strings.errors.retrieveRecipes.NO_RECIPES)
          );
        }
      } catch (err) {
        if (err) throw err;
      }
    } else {
      throw new Error(capitalizeFirst(strings.errors.token.ERROR));
    }
  },
};
