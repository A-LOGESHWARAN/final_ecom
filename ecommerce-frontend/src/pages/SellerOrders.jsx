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
        <h2 className="dashboard-title">Customer Orders</h2>

        {orders.length === 0 && (
          <p>No orders available</p>
        )}

        {orders.map(order => (
          <div key={order._id} className="card" style={{ marginBottom: "16px" }}>
            {/* BUYER INFO */}
            <p>
              <strong>Buyer:</strong>{" "}
              {order.buyer?.email || "Unknown User"}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.address || "N/A"}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {order.mobile || "N/A"}
            </p>

            {/* ITEMS */}
            <h4 style={{ marginTop: "10px" }}>Items</h4>

            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee"
                }}
              >
                <p>
                  {item.product?.name || "Product removed"}
                </p>
                <p>
                  Qty: {item.quantity} | ₹{" "}
                  {item.product?.price || item.price}
                </p>
              </div>
            ))}

            <p style={{ marginTop: "10px" }}>
              <strong>Total:</strong> ₹ {order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    order.status === "APPROVED"
                      ? "green"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                {order.status}
              </span>
            </p>

            {order.status !== "APPROVED" && (
              <button
                className="btn btn-primary"
                onClick={() => approveOrder(order._id)}
              >
                Approve Order
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SellerOrders;
