var express = require('express');
var router = express.Router();
const controllers = require('../controllers');
const auth = require('./auth/auth.service');
/* GET users listing. */
router.get('/', controllers.user.index);
router.delete('/:id', auth.hasRole('admin'), controllers.user.destroy);
router.get('/me', auth.isAuthenticated(), controllers.user.me);
router.put('/:id/password', auth.isAuthenticated(), controllers.user.changePassword);
router.get('/:id', auth.isAuthenticated(), controllers.user.show);
router.post('/', controllers.user.create);
module.exports = router;
