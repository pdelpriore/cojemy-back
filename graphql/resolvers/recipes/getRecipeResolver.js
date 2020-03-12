const User = require("../../../model/User");

module.exports = {
  getRecipe: async ({ category }) => {
    try {
      const result = await User.find({
        recipes: { $elemMatch: { category: category } }
      });
      console.log(result);
      return result;
    } catch (err) {
      if (err) throw err;
    }
  }
};
