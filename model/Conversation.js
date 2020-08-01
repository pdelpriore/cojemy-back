const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    message: {
      type: Schema.Types.ObjectId,
      ref: "message",
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
  { collection: "conversation" }
);

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
