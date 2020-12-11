const express = require('express');
const actions = require('../methods/users');
const router = express.Router();

router.post('/signup', actions.signup);
router.post('/login', actions.login);

module.exports = router;