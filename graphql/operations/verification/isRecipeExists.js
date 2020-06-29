const User = require("../../../model/User");
const Recipe = require("../../../model/Recipe");
const { strings } = require("../../../strings/Strings");

const isRecipeExists = (title, category, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      const userRecipes = await Recipe.find({ _id: { $in: user.recipes } });

      if (userRecipes) {
        userRecipes.forEach((userRecipe) => {
          if (userRecipe.title === title && userRecipe.category === category) {
            reject(strings.errors.addNewRecipe.RECIPE_EXISTS);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { isRecipeExists };
