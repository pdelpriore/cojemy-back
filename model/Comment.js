const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "recipe",
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { collection: "comment" }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
