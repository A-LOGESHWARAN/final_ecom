import { motion } from "framer-motion";
import api from "../api/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      if (res.data.role === "SELLER") navigate("/seller");
      if (res.data.role === "BUYER") navigate("/buyer");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="center-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ width: "360px" }}>
        <h2 className="dashboard-title" style={{ textAlign: "center" }}>Login</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "12px" }}>
          Don’t have an account? <Link to="/register" className="link">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
