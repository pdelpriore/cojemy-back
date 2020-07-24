const Recipe = require("../../../../model/Recipe");
const User = require("../../../../model/User");
const {
  validateMyRecipeForm,
} = require("../../../operations/validation/validateMyRecipeForm");
const {
  isRecipeExists,
} = require("../../../operations/verification/isRecipeExists");
const { strings } = require("../../../../strings/Strings");
const { uploadImage } = require("../../../operations/image/uploadImage");
const {
  sendFollowRecipeEmail,
} = require("../../../operations/email/sendFollowRecipeEmail");

module.exports = {
  addMyRecipe: async ({
    title,
    recipeImage,
    video,
    category,
    cookTime,
    ingredients,
    description,
    email,
  }) => {
    try {
      await isRecipeExists(title, category, email);
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
      const recipe = new Recipe({
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

      await User.findOneAndUpdate(
        { email: email },
        { $push: { recipes: recipe } },
        { new: true }
      ).exec();

      if (user.followers.length > 0) {
        const followers = await User.find({
          _id: { $in: user.followers },
        });
        const followersEmailList = followers.map((follower) => follower.email);
        await sendFollowRecipeEmail(
          user.name,
          title,
          followersEmailList,
          user.photo,
          imagePath
        );
      }

      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
