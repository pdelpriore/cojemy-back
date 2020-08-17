const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isRecipientRead: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    conversations: [{ type: Schema.Types.ObjectId, ref: "conversation" }],
  },
  { collection: "message" }
);

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
