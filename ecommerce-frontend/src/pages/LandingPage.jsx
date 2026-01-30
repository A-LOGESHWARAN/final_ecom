import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

/* ✅ SAMPLE FLOW IMAGES */
const demoFlow = [
  { name: "iPhone 15", price: "₹79,999", image: "/images/iphone.jpg" },
  { name: "MacBook Air", price: "₹1,14,999", image: "/images/macbook.jpg" },
  { name: "Nike Shoes", price: "₹5,999", image: "/images/shoes.jpg" },
  { name: "Headphones", price: "₹2,999", image: "/images/headphones.jpg" },
  { name: "Smart Watch", price: "₹4,499", image: "/images/watch.jpg" }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products for landing page");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="landing-wrapper">
      {/* NAVBAR */}
      <Navbar />

      {/* CENTER CONTENT */}
      <div className="center-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="card"
          style={{ width: "440px", textAlign: "center" }}
        >
          <h1 style={{ fontSize: "30px", color: "#6366f1" }}>
            E-Commerce Platform
          </h1>

          <p style={{ margin: "12px 0 28px", color: "#6b7280" }}>
            Buy. Sell. Manage products with ease.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              style={{ background: "#10b981" }}
              onClick={() => navigate("/register")}
            >
              Register
            </button>

            <button
              className="btn"
              onClick={() => navigate("/products")}
            >
              🛍️ Browse Products
            </button>
          </div>
        </motion.div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="container featured-container" style={{ marginTop: 8 }}>
        <div className="buyer-header">
          <h2>🎯 Featured Products</h2>
          <button className="btn" onClick={() => navigate("/products")}>View All</button>
        </div>

        {products.length === 0 ? (
          <div className="buyer-empty-state">
            <p>😔 No products found yet. Try again later or explore sellers.</p>
          </div>
        ) : (
          <motion.div className="grid" variants={containerVariants} initial="hidden" animate="show">
            {products.slice(0, 8).map(product => (
              <motion.div key={product._id} variants={itemVariant} whileHover={{ scale: 1.02 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>


      {/* DECORATIVE SHOP ICON ABOVE ARC */}
      <img className="landing-decor" src="/images/shop.svg" alt="shop" aria-hidden="true" />

      {/* ARC / WAVE AT BOTTOM */}
      <div className="landing-arc" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C360,120 1080,-40 1440,40 L1440,120 L0,120 Z" />
        </svg>
      </div>


    </div>
  );
};

export default LandingPage;
