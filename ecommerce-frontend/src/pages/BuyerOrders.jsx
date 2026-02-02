import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/order/my");
    setOrders(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="dashboard-title">My Orders</h2>

        {orders.length === 0 && (
          <div className="buyer-empty-state">
            <p>No orders yet — start shopping to place your first order.</p>
          </div>
        )}

        <div className="orders-grid">
          {orders.map(order => {
            const shortId = order._id ? String(order._id).slice(-6).toUpperCase() : "----";
            return (
              <div key={order._id} className="card order-card">
                <div className="order-header">
                  <div className="order-id">Order #{shortId}</div>
                  <div
                    className={
                      `order-status ${
                        order.status === "APPROVED"
                          ? "status-approved"
                          : order.status === "REJECTED"
                          ? "status-rejected"
                          : "status-pending"
                      }`
                    }
                  >
                    {order.status}
                  </div>
                </div>

                <div className="order-body">
                  <p className="order-total">
                    <strong>Total:</strong> ₹ {order.totalAmount}
                  </p>

                  <p className="order-meta">
                    <strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  {order.items && order.items.length > 0 && (
                    <div className="order-items">
                      <strong>Items:</strong>
                      <ul>
                        {order.items.map((it, idx) => (
                          <li key={idx}>
                            {it.product?.name ? it.product.name : 'Product'} x {it.quantity} — ₹ {it.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BuyerOrders;
