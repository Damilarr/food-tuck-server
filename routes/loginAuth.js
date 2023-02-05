const express = require('express');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const express = require('express');
var tuckUsers = require('../Model/userModel');
const dotenv = require('dotenv');
const { parsed: config } = dotenv.config();


const router = express.Router();

router.post('/', (req, res) => {
    tuckUsers.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({messsage:'Error on the server.'});
      if (!user) return res.status(404).send({message:'No user found with that Email.'});
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null , message:'Email or Password Incorrect'});
      const token = jwt.sign({ id: user._id },config.SECRET, {
        expiresIn: 1000 // expires in 1 hour
      });
      res.status(200).send({ auth: true, token: token, user: user, message:'Login successful' });
    });
  });
module.exports = router;