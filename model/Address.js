const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "event",
      },
    ],
    label: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: Number,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
  },
  { collection: "address" }
);

const Address = mongoose.model("address", AddressSchema);

module.exports = Address;
