const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    picture: {
      data: Buffer,
      contentType: String,
      required: false
    },
    category: {
      type: String,
      required: true
    },
    cookTime: {
      type: Number,
      required: true
    },
    ingredients: [
      {
        type: String,
        required: true
      }
    ],
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { collection: "recipe" }
);

const Recipe = mongoose.model("recipe", RecipeSchema);

module.exports = Recipe;
