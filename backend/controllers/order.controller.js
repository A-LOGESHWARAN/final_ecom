const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

/* =========================
   BUYER: PLACE ORDER
========================= */
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { address, mobile, name } = req.body;

    if (!address || !mobile) {
      return res
        .status(400)
        .json({ message: "Address and mobile are required" });
    }

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const sellerId = cart.items[0].product.seller;

    const order = await Order.create({
      buyer: userId,
      seller: sellerId,
      items: cart.items.map(i => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price
      })),
      totalAmount: cart.items.reduce(
        (sum, i) => sum + i.quantity * i.product.price,
        0
      ),
      address,
      mobile,
      name,
      status: "PENDING"
    });

    // clear cart after placing order
    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (err) {
    console.error("PLACE ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
};

/* =========================
   SELLER: VIEW ORDERS
========================= */
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      seller: req.user.userId
    })
      .populate("buyer", "email")
      .populate("items.product", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
};

/* =========================
   SELLER: APPROVE ORDER
========================= */
exports.approveOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    for (const item of order.items) {
      const product = await Product.findById(item.product._id);

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient stock" });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    order.status = "APPROVED";
    await order.save();

    res.json({ message: "Order approved & stock updated" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/* =========================
   BUYER: ORDER STATUS
========================= */
exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user.userId
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
