import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="seller-header">
          <h2>🏪 Seller Dashboard</h2>
        </div>

        <div className="seller-dashboard-cards">
          {/* MANAGE PRODUCTS */}
          <div className="seller-dashboard-card">
            <h3>📦 Products</h3>
            <p>Add, update stock and delete products. Manage your inventory with ease.</p>
            <button
              className="btn"
              onClick={() => navigate("/seller/products")}
            >
              Manage Products
            </button>
          </div>

          {/* VIEW & APPROVE ORDERS */}
          <div className="seller-dashboard-card">
            <h3>📋 Orders</h3>
            <p>View customer orders and approve them. Track all your sales.</p>
            <button
              className="btn"
              onClick={() => navigate("/seller/orders")}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
