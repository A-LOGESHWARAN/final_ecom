import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="dashboard-title">Seller Dashboard</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px"
          }}
        >
          {/* MANAGE PRODUCTS */}
          <div className="card" style={{ minWidth: "250px" }}>
            <h3>Products</h3>
            <p>Add, update stock and delete products</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/seller/products")}
            >
              Manage Products
            </button>
          </div>

          {/* VIEW & APPROVE ORDERS */}
          <div className="card" style={{ minWidth: "250px" }}>
            <h3>Orders</h3>
            <p>View customer orders and approve them</p>
            <button
              className="btn btn-primary"
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
