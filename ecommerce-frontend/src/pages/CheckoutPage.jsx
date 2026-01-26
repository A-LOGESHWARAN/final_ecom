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
        <h2 className="dashboard-title">Checkout</h2>

        <input
          className="input"
          placeholder="Delivery Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <input
          className="input"
          placeholder="Mobile Number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
        />

        <button
          className="btn btn-primary"
          style={{ marginTop: "12px" }}
          onClick={placeOrder}
        >
          Pay & Place Order
        </button>
      </div>
    </>
  );
};

export default CheckoutPage;
