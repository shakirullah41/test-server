var mongoose = require("mongoose");
var { Schema } = require("mongoose");

var AddressSchema = new Schema(
  {
    street: String,
    streetName: String,
    buildingNumber: String,
    city: String,
    zipcode: String,
    country: String,
    county_code: String,
    latitude: String,
    longitude: String,
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    person: { type: Schema.Types.ObjectId, ref: "Person" },
  },
  {
    timestamps: true,
    collection: "addresses",
  }
);
module.exports = mongoose.model("Address", AddressSchema);
