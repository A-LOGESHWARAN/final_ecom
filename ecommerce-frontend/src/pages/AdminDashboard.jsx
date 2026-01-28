import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [approvedSellers, setApprovedSellers] = useState([]);
  const [stats, setStats] = useState({
    buyers: 0,
    sellers: 0,
    activeSellers: 0
  });

  /* FETCH PENDING SELLERS */
  const fetchPendingSellers = async () => {
    try {
      const res = await api.get("/admin/pending-sellers");
      setPendingSellers(res.data);
    } catch {
      toast.error("Failed to load pending sellers");
    }
  };

  /* FETCH APPROVED SELLERS */
  const fetchApprovedSellers = async () => {
    try {
      const res = await api.get("/admin/approved-sellers");
      setApprovedSellers(res.data);
    } catch {
      toast.error("Failed to load approved sellers");
    }
  };

  /* FETCH STATS */
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch {
      toast.error("Failed to load stats");
    }
  };

  /* APPROVE SELLER */
  const approveSeller = async id => {
    try {
      await api.put(`/admin/approve-seller/${id}`);
      toast.success("Seller approved");
      fetchPendingSellers();
      fetchApprovedSellers();
      fetchStats();
    } catch {
      toast.error("Approval failed");
    }
  };

  useEffect(() => {
    fetchPendingSellers();
    fetchApprovedSellers();
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        {/* STATS */}
        <div className="grid">
          <div className="admin-stats-card">
            <h3>Total Buyers</h3>
            <h1>{stats.buyers}</h1>
          </div>

          <div className="admin-stats-card">
            <h3>Total Sellers</h3>
            <h1>{stats.sellers}</h1>
          </div>

          <div className="admin-stats-card">
            <h3>Active Sellers</h3>
            <h1>{stats.activeSellers}</h1>
          </div>

          <div className="admin-stats-card">
            <h3>Pending Requests</h3>
            <h1>{pendingSellers.length}</h1>
          </div>
        </div>

        {/* APPROVED SELLERS */}
        <h3 className="admin-section-title">Approved Sellers</h3>

        {approvedSellers.length === 0 && (
          <p className="admin-empty-state">No approved sellers yet</p>
        )}

        {approvedSellers.map(s => (
          <div key={s._id} className="admin-seller-card">
            <strong>{s.name}</strong>
            <span>{s.email}</span>
          </div>
        ))}

        {/* PENDING SELLERS */}
        <h3 className="admin-section-title">Pending Seller Approvals</h3>

        {pendingSellers.length === 0 && (
          <p className="admin-empty-state">No pending sellers</p>
        )}

        {pendingSellers.map(s => (
          <div key={s._id} className="admin-seller-card-pending">
            <div>
              <strong>{s.name}</strong>
              <p>{s.email}</p>
            </div>

            <button
              className="admin-approve-btn"
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
