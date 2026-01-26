const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const { chatbot } = require("../controllers/chatbot.controller");

router.post("/chat", auth, role("BUYER"), chatbot);

module.exports = router;
