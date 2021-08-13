var Company = require("../models/company.js");
var config = require("../../config");
var jwt = require("jsonwebtoken");

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}

module.exports = {
  index: (req, res) => {
    return Company.find({})
      .exec()
      .then((companies) => {
        res.status(200).json(companies);
      })
      .catch(handleError(res));
  },
  create: (req, res) => {
    var newCompany = new Company(req.body);
    return newCompany
      .save()
      .then((company) => {
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
