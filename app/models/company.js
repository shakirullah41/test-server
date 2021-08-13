var mongoose = require("mongoose");
var { Schema } = require("mongoose");

var CompanySchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    vat: String,
    phone: String,
    country: String,
    website: String,
    image: String,
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    contact: { type: Schema.Types.ObjectId, ref: "Person" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", CompanySchema);
