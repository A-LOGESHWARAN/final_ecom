import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/seller");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const approveOrder = async (orderId) => {
    try {
      await api.put(`/order/approve/${orderId}`);
      toast.success("Order approved");
      fetchOrders();
    } catch {
      toast.error("Approval failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="seller-header">
          <h2>📋 Customer Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="seller-empty-state">
            <p>📭 No orders available yet</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="seller-order-card">
              {/* BUYER INFO */}
              <div className="seller-order-info">
                <div>
                  <strong>👤 Buyer</strong>
                  <p>{order.buyer?.email || "Unknown User"}</p>
                </div>
                <div>
                  <strong>📍 Address</strong>
                  <p>{order.address || "N/A"}</p>
                </div>
                <div>
                  <strong>📱 Mobile</strong>
                  <p>{order.mobile || "N/A"}</p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="seller-order-items">
                <h4>🛍️ Order Items</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="seller-order-item">
                    <p><strong>{item.product?.name || item.name || "Product removed"}</strong></p>
                    <p>Quantity: {item.quantity} × ₹{item.product?.price || item.price}</p>
                  </div>
                ))}
              </div>

              <p className="seller-order-total">
                💰 Total: ₹ {order.totalAmount}
              </p>

              <p style={{ marginBottom: "16px" }}>
                <strong>Status: </strong>
                <span
                  className={`seller-order-status ${
                    order.status === "APPROVED"
                      ? "approved"
                      : order.status === "REJECTED"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              {order.status !== "APPROVED" && order.status !== "REJECTED" && (
                <button
                  className="seller-approve-btn"
                  onClick={() => approveOrder(order._id)}
                >
                  ✅ Approve Order
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SellerOrders;
