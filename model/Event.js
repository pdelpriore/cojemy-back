const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availablePlaces: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    eventDate: {
      type: Date,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
  },
  { collection: "event" }
);

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
