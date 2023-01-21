let express = require('express');
let router = express.Router();
let {register} = require('../Controller/auth');
router.post('/new',register);
module.exports = router;