const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const { capitalizeFirst } = require("../../../../util/Util");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  retrieveRecipes: async ({ category, email }, { req }) => {
    //if category === news szukaj po dacie z ostatniej doby else reszte
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        const recipes = await Recipe.find({ category: category })
          .sort({ date: -1 })
          .populate([
            { path: "author", model: User },
            { path: "comments.commentos", model: Comment },
            { path: "comments.commentator", model: User }
          ]);
        if (recipes.length > 0) {
          return recipes;
        } else {
          throw new Error(
            capitalizeFirst(strings.errors.retrieveRecipes.NO_RECIPES)
          );
        }
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};
