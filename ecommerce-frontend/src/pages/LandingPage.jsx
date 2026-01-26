import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ✅ PRODUCTS WITH IMAGES */
const products = [
  {
    name: "iPhone 15",
    price: "₹79,999",
    image: "/images/iphone.jpg"
  },
  {
    name: "MacBook Air",
    price: "₹1,14,999",
    image: "/images/macbook.jpg"
  },
  {
    name: "Nike Shoes",
    price: "₹5,999",
    image: "/images/shoes.jpg"
  },
  {
    name: "Headphones",
    price: "₹2,999",
    image: "/images/headphones.jpg"
  },
  {
    name: "Smart Watch",
    price: "₹4,499",
    image: "/images/watch.jpg"
  }
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* TOP FLOW */}
      <div className="flow-container">
        <div className="flow flow-left">
          {products.map((p, i) => (
            <div key={i} className="flow-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price}</p>
            </div>
          ))}
          {products.map((p, i) => (
            <div key={`t-${i}`} className="flow-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="center-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
              justifyContent: "center"
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
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FLOW */}
      <div className="flow-container bottom">
        <div className="flow flow-right">
          {products.map((p, i) => (
            <div key={i} className="flow-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price}</p>
            </div>
          ))}
          {products.map((p, i) => (
            <div key={`b-${i}`} className="flow-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
