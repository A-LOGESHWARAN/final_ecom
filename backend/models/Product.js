const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    stock: Number,
    category: String,
    image: String, // URL to product image

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ REQUIRED
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
