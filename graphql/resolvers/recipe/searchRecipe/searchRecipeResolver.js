const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const Rate = require("../../../../model/Rate");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  searchRecipe: async ({ recipeTitle, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      const recipes = await Recipe.find({
        title: { $regex: `.*${recipeTitle}.*`, $options: "i" },
      })
        .sort({ date: -1 })
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
        ]);
      if (recipes.length > 0) {
        return recipes;
      } else {
        throw new Error(strings.errors.retrieveRecipes.NO_RECIPES);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
