let express = require('express');
let router = express.Router();
let {register,login} = require('../Controller/regAuth');
router.post('/login',login);
router.post('/new',register);
module.exports = router;