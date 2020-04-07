const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "recipe",
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { collection: "rate" }
);

const Rate = mongoose.model("rate", RateSchema);

module.exports = Rate;
