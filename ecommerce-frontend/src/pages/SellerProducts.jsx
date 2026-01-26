import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", category: "" });

  const fetchProducts = async () => {
    const res = await api.get("/products/my-products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await api.post("/products", form);
    setForm({ name: "", price: "", stock: "", category: "" });
    fetchProducts();
  };

  const updateStock = async (id, stock) => {
    await api.put(`/products/${id}`, { stock });
    fetchProducts();
  };

  const deleteProduct = async id => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="dashboard-title">My Products</h2>

        <div className="card">
          <div className="form-row">
            <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input className="input" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            <input className="input" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          </div>

          <button className="btn btn-primary" onClick={addProduct}>
            Add Product
          </button>
        </div>

        <div className="grid" style={{ marginTop: "24px" }}>
          {products.map(p => (
            <div key={p._id} className="product-card">
              <h3 className="product-title">{p.name}</h3>
              <p className="product-price">₹ {p.price}</p>
              <p>Stock: {p.stock}</p>

              <input
                className="input"
                type="number"
                placeholder="Update stock"
                onBlur={e => updateStock(p._id, e.target.value)}
              />

              <button className="btn btn-danger" onClick={() => deleteProduct(p._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SellerProducts;
