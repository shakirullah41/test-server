var express =require('express');
var User = require('../../models/user');

// Passport Configuration
require('./local/passport').setup(User);

var router = express.Router();

router.use('/local', require('./local'));

module.exports =router;
