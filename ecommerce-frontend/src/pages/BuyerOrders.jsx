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

        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map(order => (
          <div key={order._id} className="card">
            <p>
              <strong>Total:</strong> ₹ {order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    order.status === "APPROVED"
                      ? "green"
                      : "orange"
                }}
              >
                {order.status}
              </span>
            </p>

            <p>
              <strong>Placed On:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BuyerOrders;
