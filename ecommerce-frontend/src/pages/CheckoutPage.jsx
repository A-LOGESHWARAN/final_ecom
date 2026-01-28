import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    // ✅ FRONTEND VALIDATION
    if (!address.trim() || !mobile.trim()) {
      toast.error("Please enter address and mobile number");
      return;
    }

    try {
      await api.post("/order", {
        address,
        mobile
      });

      toast.success("Order placed! Waiting for seller approval");
      navigate("/buyer");
    } catch (err) {
      console.error(
        "ORDER ERROR:",
        err.response?.data || err.message
      );

      toast.error(
        err.response?.data?.message || "Checkout failed"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="checkout-header">
          <h2>💳 Checkout</h2>
        </div>

        <div className="checkout-form">
          <h3>📦 Delivery Information</h3>
          <input
            className="checkout-input"
            placeholder="📍 Delivery Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <input
            className="checkout-input"
            placeholder="📱 Mobile Number"
            type="tel"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />

          <button
            className="checkout-submit-btn"
            onClick={placeOrder}
          >
            💰 Pay & Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
