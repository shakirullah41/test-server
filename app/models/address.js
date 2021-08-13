var mongoose = require("mongoose");
var { Schema } = require("mongoose");

var AddressSchema = new Schema(
  {
    street: String,
    streetName: {
      type: String,
      lowercase: true,
      required: true,
    },
    buildingNumber: String,
    city: String,
    zipcode: String,
    country: String,
    county_code: String,
    latitude: String,
    longitude: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Address", AddressSchema);
