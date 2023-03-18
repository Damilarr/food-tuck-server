const Users = require("../Model/userModel");

exports.addToCart = async (req, res) => {
  const id = req.body.id;
  const item = req.body.item;
  try {
    const user = await Users.findOne({ _id: id });
    user.cart = item;
    await user.save();
    res.send({ done: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getUserCart = async (req, res) => {
  //find the user using the id stored and return user cart
  const user = await Users.findOne({ _id: req.query.id });
  res.status(200).send(user.cart);
};
exports.updateCart = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.body.id });
    user.cart = req.body.item;
    await user.save();
    res.send({ done: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
