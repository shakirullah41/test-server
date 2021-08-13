var mongoose = require("mongoose");
var { Schema } = require("mongoose");

var PersonSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    phone: String,
    birthday: String,
    gender: String,
    website: String,
    image: String,
    address: { type: Schema.Types.ObjectId, ref: "Address" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Person", PersonSchema);
