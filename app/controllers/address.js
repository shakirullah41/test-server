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
    return res.status(statusCode).send(err);
  };
}

module.exports = {
  index: (req, res) => {
    return Address.find({ company: { $ne: null } })
      .populate("company", "-addresses")
      .exec()
      .then((address) => {
        res.status(200).json(address);
      })
      .catch(handleError(res));
  },
  create: (req, res) => {
    var newAddress = new Address(req.body);
    return newAddress
      .save()
      .then((address) => {
        res.status(200).json(address);
      })
      .catch(validationError(res));
  },
  show: (req, res, next) => {
    var addressId = req.params.id;

    return Address.findById(addressId)
      .exec()
      .then((Address) => {
        if (!Address) {
          return res.status(404).end();
        }
        res.json(Address);
      })
      .catch((err) => next(err));
  },

  destroy: (req, res) => {
    return Address.findByIdAndRemove(req.params.id)
      .exec()
      .then(function () {
        res.status(204).end();
      })
      .catch(handleError(res));
  },
};
