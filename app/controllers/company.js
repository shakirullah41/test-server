var mongoose = require("mongoose");
var Company = require("../models/company.js");
var Address = require("../models/address.js");

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err);
    return res.status(statusCode).send(err);
  };
}

module.exports = {
  index: (req, res) => {
    return Company.find({})
      .populate("contact")
      .populate("addresses")
      .exec()
      .then((companies) => {
        res.status(200).json(companies);
      })
      .catch(handleError(res));
  },
  create: async (req, res) => {
    const { lat, long, ...companyInfo } = req.body;
    const addressToSave = {
      _id: new mongoose.Types.ObjectId(),
      latitude: lat,
      longitude: long,
    };
    const newCompany = new Company({
      ...companyInfo,
      addresses: [addressToSave._id],
    });
    return newCompany
      .save()
      .then(async (company) => {
        const newAddress = new Address({
          ...addressToSave,
          company: company._id,
        });
        await newAddress.save();
        res.status(200).json(company);
      })
      .catch(validationError(res));
  },
  show: (req, res, next) => {
    var companyId = req.params.id;

    return Company.findById(companyId)
      .exec()
      .then((company) => {
        if (!company) {
          return res.status(404).end();
        }
        res.json(company);
      })
      .catch((err) => next(err));
  },

  destroy: (req, res) => {
    return Company.findByIdAndRemove(req.params.id)
      .exec()
      .then(function () {
        res.status(204).end();
      })
      .catch(handleError(res));
  },
};
