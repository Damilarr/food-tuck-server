let usermodel = require('../Model/userModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const {parsed:config} = dotenv.config()
exports.register =  async (req,res) => {
    let find = await usermodel.findOne({ email: req.body.email });
    if (find) {
     return res.status(400).send({status:"error",message:"Email already exists"});
    }
    const schema = Joi.object({
      name: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
          .required()
    });
    try {
      const value = await schema.validateAsync(req.body);
      req.body.password = await bcrypt.hash(req.body.password,10);
      let user = await usermodel.create(req.body);
      const token = await jwt.sign({ id: user._id },config.SECRET, {
        expiresIn: 1000 // expires in 1 hour
      });
      let message = {status:'success',message:"Account created Successfully",details:user,token:token}
      res.status(200) 
      res.send(message)
    } catch (error) {
      res.status(400)
      res.send(error)
      
    }
    
}