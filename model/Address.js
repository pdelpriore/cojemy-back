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
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { collection: "address" }
);

const Address = mongoose.model("address", AddressSchema);

module.exports = Address;
