const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
    streetNumber: {
      type: Number,
      required: false,
    },
    streetName: {
      type: String,
      required: true,
    },
    postCode: {
      type: Number,
      required: true,
    },
    city: {
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
