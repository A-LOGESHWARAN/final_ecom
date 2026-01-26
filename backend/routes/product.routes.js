const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getAllProducts
} = require("../controllers/product.controller");

/* BUYER */
router.get("/", getAllProducts);

/* SELLER */
router.post("/", auth, role("SELLER"), addProduct);
router.get("/my-products", auth, role("SELLER"), getMyProducts);
router.put("/:id", auth, role("SELLER"), updateProduct);
router.delete("/:id", auth, role("SELLER"), deleteProduct);

module.exports = router;
