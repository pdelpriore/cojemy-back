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
    },
    comments: [
      {
        commentator: {
          type: Schema.Types.ObjectId,
          ref: "user"
        },
        comment: { type: Schema.Types.ObjectId, ref: "comment" },
        rate: { type: Schema.Types.ObjectId, ref: "rate" }
      }
    ]
  },
  { collection: "recipe" }
);

const Recipe = mongoose.model("recipe", RecipeSchema);

module.exports = Recipe;
