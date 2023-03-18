const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../Model/userModel");

const dotenv = require("dotenv");
const { parsed: config } = dotenv.config();
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
exports.googleSignIn = async (req, res) => {
  try {
    const token = req.body.idToken;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { id, name, email, picture } = payload;
    const wbtoken = jwt.sign({ id: id }, config.SECRET, {
      expiresIn: 1000,
    });

    let foundUser = await Users.findOne({ email: email });
    console.log("jjjjjjj", foundUser);
    if (!foundUser) {
      const password = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new Users({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      res.status(200).send({
        auth: true,
        token: wbtoken,
        user: user,
        message: "Login successful",
      });
    } else {
      const userDetails = { name, email, picture, _id: foundUser._id };
      res.status(200).send({
        auth: true,
        token: wbtoken,
        user: userDetails,
        message: "Login successful",
      });
    }
  } catch (error) {
    res
      .status(401)
      .send({ auth: false, token: null, message: "Invalid Credentials" });
  }
};
