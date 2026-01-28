import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // always read role from localStorage
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <span
        className="nav-title"
        onClick={() => {
          if (role === "BUYER") navigate("/buyer");
          else if (role === "SELLER") navigate("/seller");
          else if (role === "ADMIN") navigate("/admin");
          else navigate("/");
        }}
      >
        🛍️ E-Commerce
      </span>

      <div className="nav-right">
        {/* ✅ CART ONLY FOR BUYER */}
        {role === "BUYER" && (
          <button
            className="nav-cart-btn"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart
          </button>
        )}

        {/* ROLE BADGE */}
        {role && (
          <span className="nav-role-badge">
            {role === "ADMIN" && "👑 "}
            {role === "SELLER" && "🏪 "}
            {role === "BUYER" && "🛒 "}
            {role}
          </span>
        )}

        {/* LOGOUT */}
        <button
          className="nav-logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
