const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

/* ADD PRODUCT */
exports.addProduct = async (req, res) => {
  try {
    const body = req.body || {};
    const { name, price, stock, category } = body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Basic validation
    if (!name || !price || !stock || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = null;
    if (req.file) {
      // If Cloudinary is configured, upload there; otherwise use local file path
      const hasCloudinaryConfig = process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET;

      if (hasCloudinaryConfig) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, { folder: "products" });
          imageUrl = result.secure_url;
          // remove temp file
          try { fs.unlinkSync(req.file.path); } catch (e) { console.warn("Failed to remove temp file", e); }
        } catch (err) {
          console.error("Cloudinary upload failed:", err);
          // keep local file as fallback URL (absolute URL)
          imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }
      } else {
        // fallback: serve directly from uploads folder
        imageUrl = `/uploads/${req.file.filename}`;
      }
    }

    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      image: imageUrl,
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
    const updateData = { ...req.body };

    if (req.file) {
      const hasCloudinaryConfig = process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET;

      if (hasCloudinaryConfig) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, { folder: "products" });
          updateData.image = result.secure_url;
          try { fs.unlinkSync(req.file.path); } catch (e) { console.warn("Failed to remove temp file", e); }
        } catch (err) {
          console.error("Cloudinary update upload failed:", err);
          // fallback to local file (absolute URL)
          updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }
      } else {
        updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      }
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.userId },
      updateData,
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
