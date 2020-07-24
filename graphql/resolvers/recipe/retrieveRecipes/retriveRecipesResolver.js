const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const Rate = require("../../../../model/Rate");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  retrieveRecipes: async ({ category, skip, limit }) => {
    try {
      if (category === strings.retrieveRecipes.CAT_NEWS) {
        const recipesNewest = await Recipe.find({
          date: { $gt: new Date().getTime() - 1000 * 3600 * 24 },
        })
          .sort({ date: -1 })
          .skip((skip - 1) * limit)
          .limit(limit)
          .populate([
            {
              path: "author",
              select: "-password",
              model: User,
              populate: { path: "followers", select: "-password", model: User },
            },
            {
              path: "comments.commentator",
              select: "-password",
              model: User,
            },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
          ]);
        if (recipesNewest.length > 0) {
          return recipesNewest;
        } else {
          throw new Error(strings.errors.retrieveRecipes.NO_RECIPES);
        }
      } else {
        const recipes = await Recipe.find({ category: category })
          .sort({ date: -1 })
          .skip((skip - 1) * limit)
          .limit(limit)
          .populate([
            {
              path: "author",
              select: "-password",
              model: User,
              populate: { path: "followers", select: "-password", model: User },
            },
            {
              path: "comments.commentator",
              select: "-password",
              model: User,
            },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
          ]);
        if (recipes.length > 0) {
          return recipes;
        } else {
          throw new Error(strings.errors.retrieveRecipes.NO_RECIPES);
        }
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
