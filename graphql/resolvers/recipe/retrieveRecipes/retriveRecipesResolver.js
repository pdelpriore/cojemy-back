const { findRecipe } = require("../../../operations/recipes/findRecipe");

module.exports = {
  retrieveRecipes: async ({ category }) => {
    try {
      const recipes = await findRecipe(category);
      if (recipes) return recipes;
    } catch (err) {
      if (err) throw err;
    }
  }
};
