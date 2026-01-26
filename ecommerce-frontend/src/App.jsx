import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";


import AdminDashboard from "./pages/AdminDashboard";

import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import SellerOrders from "./pages/SellerOrders";

import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerOrders from "./pages/BuyerOrders";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* LANDING */}
      <Route path="/" element={<LandingPage />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* SELLER */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute role="SELLER">
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/products"
        element={
          <ProtectedRoute role="SELLER">
            <SellerProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/orders"
        element={
          <ProtectedRoute role="SELLER">
            <SellerOrders />
          </ProtectedRoute>
        }
      />

      {/* BUYER */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute role="BUYER">
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer/orders"
        element={
          <ProtectedRoute role="BUYER">
            <BuyerOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute role="BUYER">
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute role="BUYER">
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
