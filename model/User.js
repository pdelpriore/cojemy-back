const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      data: Buffer,
      contentType: String,
      required: false
    },
    googlePhoto: {
      type: String,
      require: true
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true
    },
    isGoogleUser: {
      type: Boolean,
      required: true
    },
    creationDate: {
      type: Date,
      required: true
    }
  },
  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
