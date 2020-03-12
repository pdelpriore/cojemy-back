const Recipe = require("../../../model/Recipe");

const findRecipe = async category => {
  const recipeFound = await new Promise(async (resolve, reject) => {
    try {
      const recipes = await Recipe.find({ category: category }).populate(
        "author"
      );
      console.log(recipes);
      if (recipes !== [] || recipes !== null) {
        resolve(recipes);
      } else if (recipes === [] || recipes === null) {
        reject("no recipes");
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return recipeFound;
};

module.exports = { findRecipe };
