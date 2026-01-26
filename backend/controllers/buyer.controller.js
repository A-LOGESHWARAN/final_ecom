const Product = require("../models/Product");
const Order = require("../models/Order");

/* GET ALL PRODUCTS (BUYER) */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } })
      .populate("seller", "name email");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* SEARCH PRODUCTS */
exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

/* PLACE ORDER */
exports.placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product?.name}`
        });
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;

      item.price = product.price;
      item.product = product._id;
    }

    const order = await Order.create({
      buyer: req.user.userId,
      items,
      totalAmount: total
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};
