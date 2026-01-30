const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/upload");

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
// POST does not accept image uploads; add product data as JSON
router.post("/", auth, role("SELLER"), addProduct);
router.get("/my-products", auth, role("SELLER"), getMyProducts);
router.put("/:id", auth, role("SELLER"), upload.single("image"), updateProduct);
router.delete("/:id", auth, role("SELLER"), deleteProduct);

module.exports = router;
