const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    userSocketId: {
      type: String,
      required: true,
    },
  },
  { collection: "socket" }
);

const Socket = mongoose.model("socket", SocketSchema);

module.exports = Socket;
