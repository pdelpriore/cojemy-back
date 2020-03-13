const Recipe = require("../../../../model/Recipe");
const { capitalizeFirst } = require("../../../../util/Util");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  retrieveRecipes: async ({ category }) => {
    try {
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
    } catch (err) {
      if (err) throw err;
    }
  }
};
