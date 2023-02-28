const express = require('express')
const router = express.Router()
const {checkout} = require('../Controller/checkout')
router.post('/',checkout);
module.exports = router;