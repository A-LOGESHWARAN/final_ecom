const User = require("../models/User");

/* ADMIN STATS */
exports.getAdminStats = async (req, res) => {
  try {
    const buyers = await User.countDocuments({ role: "BUYER" });
    const sellers = await User.countDocuments({ role: "SELLER" });
    const activeSellers = await User.countDocuments({
      role: "SELLER",
      approved: true
    });

    res.json({
      buyers,
      sellers,
      activeSellers
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

/* PENDING SELLERS */
exports.getPendingSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      role: "SELLER",
      approved: false
    }).select("-password");

    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
};

/* APPROVE SELLER */
exports.approveSeller = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      approved: true
    });

    res.json({ message: "Seller approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};
exports.getApprovedSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      role: "SELLER",
      approved: true
    }).select("name email");

    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch approved sellers" });
  }
};