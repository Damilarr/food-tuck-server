const express = require('express');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var tuckUsers = require('../Model/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await tuckUsers.findOne({ email });
  if (!user) return res.status(401).send('Email is incorrect');
  const isPasswordValid = await bcrypt.compare(password , tuckUsers.password,function(err, match) {
                if (err) throw new Error(err);
                else if (match == false) {
                    return res.json({
                        success: false,
                        message: 'Wrong Password'
                    })
                } else {
                    callback(user);
                    return;
                }
            });
  if (!isPasswordValid) return res.status(401).send('Email or password is incorrect');
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});
module.exports = router;