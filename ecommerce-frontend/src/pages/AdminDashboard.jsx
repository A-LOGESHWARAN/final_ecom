import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [sellers, setSellers] = useState([]);
  const [stats, setStats] = useState({
    buyers: 0,
    sellers: 0,
    activeSellers: 0
  });

  /* FETCH PENDING SELLERS */
  const fetchSellers = async () => {
    try {
      const res = await api.get("/admin/pending-sellers");
      setSellers(res.data);
    } catch (err) {
      toast.error("Failed to load pending sellers");
    }
  };

  /* FETCH STATS */
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      toast.error("Failed to load stats");
    }
  };

  /* APPROVE SELLER */
  const approveSeller = async id => {
    try {
      await api.put(`/admin/approve-seller/${id}`);
      toast.success("Seller approved");
      fetchSellers();
      fetchStats();
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  useEffect(() => {
    fetchSellers();
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        {/* STATS CARDS */}
        <div className="grid" style={{ marginBottom: "24px" }}>
          <div className="card">
            <h3>Total Buyers</h3>
            <h1>{stats.buyers}</h1>
          </div>

          <div className="card">
            <h3>Total Sellers</h3>
            <h1>{stats.sellers}</h1>
          </div>

          <div className="card">
            <h3>Active Sellers</h3>
            <h1>{stats.activeSellers}</h1>
          </div>

          {/* ✅ NEW: PENDING REQUESTS */}
          <div className="card">
            <h3>Pending Requests</h3>
            <h1>{sellers.length}</h1>
          </div>
        </div>

        {/* PENDING SELLERS LIST */}
        <h3 style={{ marginBottom: "12px" }}>
          Pending Seller Approvals
        </h3>

        {sellers.length === 0 && <p>No pending sellers</p>}

        {sellers.map(s => (
          <div
            key={s._id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
            }}
          >
            <span>{s.email}</span>
            <button
              className="btn btn-primary"
              onClick={() => approveSeller(s._id)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
