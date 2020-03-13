const Recipe = require("../../../../model/Recipe");
const { capitalizeFirst } = require("../../../../util/Util");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  retrieveRecipes: async ({ category, email, isGoogleUser }, { req }) => {
    //if category === news szukaj po dacie z ostatniej doby else reszte
    try {
      const tokenVerified = await verifyToken(
        email,
        req.cookies.id,
        isGoogleUser
      );
      if (tokenVerified) {
        const recipes = await Recipe.find({ category: category }).populate(
          "author"
        );
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
