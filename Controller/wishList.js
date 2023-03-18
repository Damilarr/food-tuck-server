const Users = require("../Model/userModel");

exports.addToWishList = async (req, res) => {
  const id = req.body.id;
  const item = req.body.item;
  try {
    const user = await Users.findOne({ _id: id });
    user.wishList = item;
    await user.save();
    res.send({ done: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getUserWishList = async (req, res) => {
  //find the user using the id stored and return user cart
  const user = await Users.findOne({ _id: req.query.id });
  res.status(200).send(user.wishList);
};
exports.updateWishList = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.body.id });
    user.wishList = req.body.item;
    await user.save();
    res.send({ done: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
