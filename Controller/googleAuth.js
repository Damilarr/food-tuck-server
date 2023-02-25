const { OAuth2Client } = require("google-auth-library");
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const {parsed:config} = dotenv.config()
const client =  new OAuth2Client(config.GOOGLE_CLIENT_ID);
exports.googleSignIn = async (req,res) =>{
    try {
        const token = req.body.idToken;
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:config.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload()
        const  {id,name,email,picture} = payload;
        const user = {name,email,picture}
        const wbtoken = jwt.sign({id:id},config.SECRET,{
            expiresIn:1000
        })
        res.status(200).send({ auth: true, token: wbtoken, user: user, message:'Login successful' });
    } catch (error) {
        res.status(401).send({ auth: false, token: null , message:'Invalid Credentials'});
    }
} 
