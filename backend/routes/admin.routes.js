const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  getAdminStats,
  getPendingSellers,
  approveSeller
} = require("../controllers/admin.controller");

/* ADMIN DASHBOARD */
router.get(
  "/stats",
  auth,
  role("ADMIN"),
  getAdminStats
);

router.get(
  "/pending-sellers",
  auth,
  role("ADMIN"),
  getPendingSellers
);

router.put(
  "/approve-seller/:id",
  auth,
  role("ADMIN"),
  approveSeller
);

module.exports = router;
