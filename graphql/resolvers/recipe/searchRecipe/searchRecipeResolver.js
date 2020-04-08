const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const Rate = require("../../../../model/Rate");
const { capitalizeFirst } = require("../../../../util/Util");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { capitalize } = require("../../../../util/Util");

module.exports = {
  searchRecipe: async ({ recipeTitle, email }, { req }) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        const recipes = await Recipe.find({
          title: { $regex: `.*${capitalize(recipeTitle)}.*` },
        })
          .sort({ date: -1 })
          .populate([
            { path: "author", model: User },
            { path: "comments.commentator", model: User },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
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
  },
};
