let express = require("express");
const router = express.Router();
const {
  addToWishList,
  getUserWishList,
  updateWishList,
} = require("../Controller/wishList");
router.post("/", addToWishList);
router.get("/", getUserWishList);
router.post("/update", updateWishList);

module.exports = router;
