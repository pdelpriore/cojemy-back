const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateMyRecipeForm,
} = require("../../../operations/validation/validateMyRecipeForm");
const { strings } = require("../../../../strings/Strings");
const { uploadImage } = require("../../../operations/image/uploadImage");

module.exports = {
  addMyRecipe: async (
    {
      title,
      recipeImage,
      video,
      category,
      cookTime,
      ingredients,
      description,
      email,
    },
    { req }
  ) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        const recipeExists = await Recipe.findOne({
          title: title,
          category: category,
        });
        if (recipeExists === null) {
          await validateMyRecipeForm(
            title,
            recipeImage,
            video,
            category,
            cookTime,
            ingredients,
            description
          );
          const imagePath =
            recipeImage &&
            (await uploadImage(recipeImage, strings.imageTypes.RECIPE));

          const user = await User.findOne({ email: email });
          let recipe = new Recipe({
            title: title,
            picture: imagePath,
            video: video,
            category: category,
            cookTime: cookTime,
            ingredients: ingredients,
            description: description,
            date: new Date(),
            author: user,
            comments: [],
          });
          await recipe.save();
          const userWithRecipesArrayUpdated = await User.findOneAndUpdate(
            { email: email },
            { $push: { recipes: recipe } },
            { new: true }
          ).exec();
          const userRecipesUpdated = await Recipe.find({
            _id: { $in: userWithRecipesArrayUpdated.recipes },
          })
            .sort({ date: -1 })
            .populate([
              { path: "author", model: User },
              { path: "comments.commentator", model: User },
              { path: "comments.comment", model: Comment },
              { path: "comments.rate", model: Rate },
            ]);
          return userRecipesUpdated;
        } else {
          throw new Error(strings.errors.addNewRecipe.RECIPE_EXISTS);
        }
      } else {
        throw new Error(strings.errors.token.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
