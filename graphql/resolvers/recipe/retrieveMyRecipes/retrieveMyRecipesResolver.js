const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const Comment = require("../../../../model/Comment");
const Rate = require("../../../../model/Rate");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  retrieveMyRecipes: async ({ email }, { req }) => {
    try {
      await verifyToken(email, req.cookies.id);
      const user = await User.findOne({ email: email });
      if (user.recipes.length > 0) {
        let myRecipes = await Recipe.find({ _id: { $in: user.recipes } })
          .sort({ date: -1 })
          .populate([
            { path: "author", select: "-password", model: User },
            {
              path: "comments.commentator",
              select: "-password",
              model: User,
            },
            { path: "comments.comment", model: Comment },
            { path: "comments.rate", model: Rate },
          ]);
        return myRecipes;
      } else {
        throw new Error(strings.errors.retrieveRecipes.NO_RECIPES);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
