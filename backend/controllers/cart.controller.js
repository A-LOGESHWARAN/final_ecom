const Cart = require("../models/Cart");
const Product = require("../models/Product"); // 1. Added Product import

/* ADD TO CART - With Stock Validation */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: []
      });
    }

    const existingItem = cart.items.find(
      i => i.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ message: "Add to cart failed" });
  }
};
 

/* UPDATE QUANTITY - With Stock Validation */
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // ✅ THIS LINE
    const userId = req.user.userId;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      i => i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({ message: "Quantity updated" });
  } catch (err) {
    console.error("UPDATE QUANTITY ERROR:", err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
};

/* GET CART */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product"); // 🔥 THIS IS THE KEY

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/* REMOVE ITEM */
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // ✅ ACTUAL DB REMOVAL
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save(); // 🔥 THIS IS THE KEY LINE

    res.json(cart);
  } catch (err) {
    console.error("REMOVE CART ERROR:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};