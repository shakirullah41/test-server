var express = require("express");
var users = require("./users");
var company = require("./company");
var person = require("./person");
var address = require("./address");

module.exports = (app) => {
  app.use("/api/user", users);
  app.use("/api/company", company);
  app.use("/api/person", person);
  app.use("/api/address", address);
  app.use("/auth", require("./auth"));
};
