const Product = require("../models/Product");
const Cart = require("../models/Cart");

/* MAIN CHATBOT HANDLER */
exports.chatbot = async (req, res) => {
  const message = req.body.message.toLowerCase();

  try {
    /* SUGGEST PRODUCTS */
    if (message.includes("suggest")) {
      const products = await Product.find({ stock: { $gt: 0 } }).limit(5);
      return res.json({
        reply: "Here are some popular products",
        products
      });
    }

    /* SEARCH PRODUCT */
    if (message.includes("search") || message.includes("find")) {
      const keyword = message.replace("search", "").replace("find", "").trim();

      const products = await Product.find({
        name: { $regex: keyword, $options: "i" }
      });

      return res.json({
        reply: `Results for "${keyword}"`,
        products
      });
    }

    /* ADD TO CART */
    if (message.includes("add")) {
      const keyword = message.replace("add", "").replace("to cart", "").trim();

      const product = await Product.findOne({
        name: { $regex: keyword, $options: "i" }
      });

      if (!product)
        return res.json({ reply: "Product not found" });

      let cart = await Cart.findOne({ buyer: req.user.userId });

      if (!cart) {
        cart = await Cart.create({
          buyer: req.user.userId,
          items: []
        });
      }

      const existingItem = cart.items.find(
        item => item.product.toString() === product._id.toString()
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: product._id });
      }

      await cart.save();

      return res.json({
        reply: `${product.name} added to cart`
      });
    }

    res.json({
      reply: "I can help you search, suggest, or add products to cart"
    });

  } catch (error) {
    res.status(500).json({ reply: "Chatbot error occurred" });
  }
};
