import { motion } from "framer-motion";
import api from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER"
  });

  const handleRegister = async () => {
    await api.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="center-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ width: "380px" }}>
        <h2 className="dashboard-title" style={{ textAlign: "center" }}>Register</h2>

        <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="input" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

        <select className="input" onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleRegister}>
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "12px" }}>
          Already have an account? <Link to="/" className="link">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
