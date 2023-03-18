let express = require("express");
const router = express.Router();
const { addToCart, getUserCart, updateCart } = require("../Controller/cart");
router.post("/", addToCart);
router.get("/", getUserCart);
router.post("/update", updateCart);

module.exports = router;
