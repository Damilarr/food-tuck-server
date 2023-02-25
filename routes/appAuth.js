let express = require('express');
let router = express.Router();
let {googleSignIn} = require('../Controller/googleAuth');
router.post('/',googleSignIn);
// router.post('/new',register);
module.exports = router;