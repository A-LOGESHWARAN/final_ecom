const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// 🔹 Pending sellers
router.get(
  "/pending-sellers",
  auth,
  role("ADMIN"),
  adminController.getPendingSellers
);

// 🔹 Approved sellers
router.get(
  "/approved-sellers",
  auth,
  role("ADMIN"),
  adminController.getApprovedSellers
);

// 🔹 Approve seller
router.put(
  "/approve-seller/:id",
  auth,
  role("ADMIN"),
  adminController.approveSeller
);

// 🔹 Admin stats
router.get(
  "/stats",
  auth,
  role("ADMIN"),
  adminController.getAdminStats
);

module.exports = router;
