import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", category: "" });
  const [stockInputs, setStockInputs] = useState({}); // Track stock input values for each product

  const fetchProducts = async () => {
    const res = await api.get("/products/my-products");
    setProducts(res.data);
    // Initialize stock inputs with current stock values
    const initialStockInputs = {};
    res.data.forEach(product => {
      initialStockInputs[product._id] = product.stock;
    });
    setStockInputs(initialStockInputs);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await api.post("/products", form);
    setForm({ name: "", price: "", stock: "", category: "" });
    fetchProducts();
  };

  const updateStock = async (id) => {
    const newStock = stockInputs[id];
    if (newStock === undefined || newStock === "") {
      return; // Don't update if input is empty
    }
    await api.put(`/products/${id}`, { stock: newStock });
    fetchProducts();
  };

  const handleStockInputChange = (id, value) => {
    setStockInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const deleteProduct = async id => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="seller-header">
          <h2>📦 My Products</h2>
        </div>

        <div className="seller-products-form">
          <h3>➕ Add New Product</h3>
          <div className="seller-form-row">
            <input 
              className="seller-form-input" 
              placeholder="Product Name" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
            <input 
              className="seller-form-input" 
              placeholder="Price (₹)" 
              type="number"
              value={form.price} 
              onChange={e => setForm({ ...form, price: e.target.value })} 
            />
            <input 
              className="seller-form-input" 
              placeholder="Stock Quantity" 
              type="number"
              value={form.stock} 
              onChange={e => setForm({ ...form, stock: e.target.value })} 
            />
            <input 
              className="seller-form-input" 
              placeholder="Category" 
              value={form.category} 
              onChange={e => setForm({ ...form, category: e.target.value })} 
            />
          </div>

          <button className="seller-add-product-btn" onClick={addProduct}>
            ➕ Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="seller-empty-state">
            <p>📭 No products yet. Add your first product above!</p>
          </div>
        ) : (
          <div className="grid">
            {products.map(p => (
              <div key={p._id} className="seller-product-card">
                <h3>{p.name}</h3>
                <p className="product-price">₹ {p.price}</p>
                <p className="product-stock">📊 Current Stock: {p.stock}</p>

                <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                  <input
                    className="seller-form-input"
                    type="number"
                    placeholder="New stock quantity"
                    value={stockInputs[p._id] !== undefined ? stockInputs[p._id] : p.stock}
                    onChange={e => handleStockInputChange(p._id, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    className="seller-update-stock-btn"
                    onClick={() => updateStock(p._id)}
                  >
                    ✅ Update
                  </button>
                </div>

                <button className="seller-delete-btn" onClick={() => deleteProduct(p._id)}>
                  🗑️ Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProducts;
