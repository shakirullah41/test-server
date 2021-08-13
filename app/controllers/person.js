var Person = require("../models/person.js");

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
    return Person.find({})
      .exec()
      .then((person) => {
        res.status(200).json(person);
      })
      .catch(handleError(res));
  },
  create: (req, res) => {
    var newPerson = new Person(req.body);
    return newPerson
      .save()
      .then((person) => {
        res.status(200).json(person);
      })
      .catch(validationError(res));
  },
  show: (req, res, next) => {
    var personId = req.params.id;

    return Person.findById(personId)
      .exec()
      .then((person) => {
        if (!person) {
          return res.status(404).end();
        }
        res.json(person);
      })
      .catch((err) => next(err));
  },

  destroy: (req, res) => {
    return Person.findByIdAndRemove(req.params.id)
      .exec()
      .then(function () {
        res.status(204).end();
      })
      .catch(handleError(res));
  },
};
