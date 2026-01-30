const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
// Serve uploaded files (fallback when Cloudinary not configured)
app.use('/uploads', express.static('uploads'));

/* ROUTES */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));

// 🔥 THIS WAS MISSING / WRONG
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
