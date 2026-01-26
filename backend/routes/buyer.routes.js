const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  getAllProducts,
  searchProducts,
  placeOrder
} = require("../controllers/buyer.controller");

/* BUYER ROUTES */
router.get("/products", auth, role("BUYER"), getAllProducts);
router.get("/search", auth, role("BUYER"), searchProducts);
router.post("/order", auth, role("BUYER"), placeOrder);

module.exports = router;
