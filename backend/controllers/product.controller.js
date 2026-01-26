const Product = require("../models/Product");

/* ADD PRODUCT */
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await Product.create({
      name,
      price,
      stock,
      category,
      seller: req.user.userId
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: "Add product failed" });
  }
};

/* ✅ GET SELLER PRODUCTS */
exports.getMyProducts = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const products = await Product.find({
      seller: req.user.userId
    });

    res.json(products);
  } catch (err) {
    console.error("GET SELLER PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* UPDATE PRODUCT */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.userId },
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* DELETE PRODUCT */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.userId
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ✅ GET ALL PRODUCTS (BUYER) */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email"); // ✅ THIS LINE FIXES IT

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
