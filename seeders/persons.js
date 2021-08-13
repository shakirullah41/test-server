var Company = require("../app/models/company.js");
var Person = require("../app/models/person.js");
var Address = require("../app/models/address.js");
var config = require("../config");
var mongoose = require("mongoose");
const axios = require("axios");

axios.get("https://fakerapi.it/api/v1/persons").then(async (response) => {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/anna-server-dev",
    {
      db: {
        safe: true,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const {
    data: { data },
  } = response;
  let adressToSave = [];
  const contactToSave = data.map((d) => {
    let { address, ...contactInfo } = d;
    address._id = new mongoose.Types.ObjectId();
    const toReturn = {
      _id: new mongoose.Types.ObjectId(),
      address: address._id,
      ...contactInfo,
    };
    adressToSave.push({ ...address, person: toReturn._id });
    return toReturn;
  });
  return Promise.all([
    Person.insertMany(contactToSave),
    Address.insertMany(adressToSave),
  ]);
});
