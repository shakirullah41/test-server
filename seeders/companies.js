var Company = require("../app/models/company.js");
var Person = require("../app/models/person.js");
var Address = require("../app/models/address.js");
var config = require("../config");
var mongoose = require("mongoose");
const axios = require("axios");

axios.get("https://fakerapi.it/api/v1/companies").then(async (response) => {
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
  const contactToSave = [];
  const companies = await data.map(async (d) => {
    const { contact, addresses, ...restOfAttributes } = d;
    let { address: contactAddress, ...contactInfo } = contact;
    const company = { ...restOfAttributes, _id: new mongoose.Types.ObjectId() };
    const address = await addresses.map((a) => {
      return { ...a, company: company._id, _id: new mongoose.Types.ObjectId() };
    });
    const contactObj = { ...contactInfo, _id: new mongoose.Types.ObjectId() };
    contactAddress._id = new mongoose.Types.ObjectId();
    contactAddress.person = contactObj._id;
    address.push(contactAddress);
    const addressIds = address.map((a) => a._id);
    adressToSave = adressToSave.concat(address);
    contactToSave.push(contactObj);
    return Company.create({
      ...company,
      addressess: addressIds,
      contact: contactObj._id,
    });
  });
  console.log(adressToSave);
  return Promise.all([
    ...companies,
    Person.insertMany(contactToSave),
    Address.insertMany(adressToSave),
  ]);
});
