const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const cartController = require("../controllers/cart.controller");

/* ADD TO CART */
router.post("/", auth, cartController.addToCart);

/* GET CART */
router.get("/", auth, cartController.getCart);

/* UPDATE QUANTITY */
router.put("/update", auth, cartController.updateQuantity);

/* REMOVE ITEM */
router.delete("/:productId", auth, cartController.removeFromCart);
router.put(
  "/update",
  auth,
  cartController.updateQuantity
);

module.exports = router;
