import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ChatBot from "../components/ChatBot";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ FILTER STATES
  const [category, setCategory] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  // APPLY FILTERS
  useEffect(() => {
    let filtered = [...products];

    if (category !== "ALL") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    setFilteredProducts(filtered);
  }, [category, maxPrice, products]);

  // GET UNIQUE CATEGORIES
  const categories = ["ALL", ...new Set(products.map(p => p.category))];

  return (
    <>
      <Navbar />

      <div className="container">
        {/* HEADER */}
        <div className="buyer-header">
          <h2>🛍️ Products</h2>
          <button
            className="btn"
            onClick={() => navigate("/buyer/orders")}
          >
            📦 Order Status
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="buyer-filter-bar">
          <label>🔍 Filter Products:</label>
          {/* CATEGORY FILTER */}
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* PRICE FILTER */}
          <input
            type="number"
            placeholder="Max Price ₹"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />

          {/* RESET */}
          <button
            className="btn btn-secondary"
            onClick={() => {
              setCategory("ALL");
              setMaxPrice("");
            }}
          >
            🔄 Reset
          </button>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="buyer-empty-state">
            <p>😔 No products found. Try adjusting your filters!</p>
          </div>
        ) : (
          <div className="grid">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* CHAT BOT */}
      <ChatBot />
    </>
  );
};

export default Products;
