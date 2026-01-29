const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  placeOrder,
  approveOrder,
  getBuyerOrders,
  getSellerOrders
} = require("../controllers/order.controller");

/* BUYER */
router.post("/", auth, role("BUYER"), placeOrder);
router.get("/my", auth, role("BUYER"), getBuyerOrders);

/* SELLER */
router.get("/seller", auth, role("SELLER"), getSellerOrders);
router.put("/approve/:id", auth, role("SELLER"), approveOrder);

module.exports = router;
