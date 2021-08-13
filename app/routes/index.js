
var express = require('express');
var usersRouter = require('./users');

module.exports = (app)=>{
  app.use('/api/user', usersRouter);
  app.use('/auth', require('./auth'));
};
