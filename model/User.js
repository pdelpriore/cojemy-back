const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      require: false,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
    },
    isGoogleUser: {
      type: Boolean,
      required: true,
    },
    isPremium: {
      type: Boolean,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
    events: [{ type: Schema.Types.ObjectId, ref: "event" }],
    eventsJoined: [{ type: Schema.Types.ObjectId, ref: "event" }],
  },
  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
