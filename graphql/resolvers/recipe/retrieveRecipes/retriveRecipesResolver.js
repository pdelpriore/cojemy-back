const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const Rate = require("../../../../model/Rate");
const { capitalizeFirst } = require("../../../../util/Util");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  retrieveRecipes: async ({ category, email, skip, limit }, { req }) => {
    const tokenVerified = await verifyToken(email, req.cookies.id);
    if (tokenVerified) {
      if (category === strings.retrieveRecipes.CAT_NEWS) {
        try {
          const recipesNewest = await Recipe.find({
            date: { $gt: new Date().getTime() - 1000 * 3600 * 24 },
          })
            .sort({ date: -1 })
            .skip((skip - 1) * limit)
            .limit(limit)
            .populate([
              { path: "author", model: User },
              { path: "comments.commentator", model: User },
              { path: "comments.comment", model: Comment },
              { path: "comments.rate", model: Rate },
            ]);
          if (recipesNewest.length > 0) {
            return recipesNewest;
          } else {
            throw new Error(
              capitalizeFirst(strings.errors.retrieveRecipes.NO_RECIPES)
            );
          }
        } catch (err) {
          if (err) throw err;
        }
      } else {
        try {
          const recipes = await Recipe.find({ category: category })
            .sort({ date: -1 })
            .skip((skip - 1) * limit)
            .limit(limit)
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
        } catch (err) {
          if (err) throw err;
        }
      }
    } else {
      throw new Error(capitalizeFirst(strings.errors.token.ERROR));
    }
  },
};
