import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data || { items: [] });
    } catch (err) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  /* UPDATE QUANTITY */
  const updateQuantity = async (productId, currentQty, change) => {
  const newQty = currentQty + change;
  if (newQty < 1) return;

  try {
    await api.put("/cart/update", {
      productId,
      quantity: newQty
    });

    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.product?._id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    }));
  } catch (err) {
    console.error(err);
    toast.error("Failed to update quantity");
  }
};

  /* REMOVE ITEM */
  const removeFromCart = async productId => {
    try {
      await api.delete(`/cart/${productId}`);

      setCart(prev => ({
        ...prev,
        items: prev.items.filter(
          item => item.product?._id !== productId
        )
      }));

      toast.info("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  /* TOTAL */
  const total = cart.items.reduce(
    (sum, i) =>
      sum + (i.product?.price || 0) * i.quantity,
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">Loading cart...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="dashboard-title">My Cart</h2>

        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.items.map(i =>
              i.product ? (
                <div key={i.product._id} className="card">
                  <h3>{i.product.name}</h3>
                  <p>₹ {i.product.price}</p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <button
                      className="btn"
                      onClick={() =>
                        updateQuantity(
                          i.product._id,
                          i.quantity,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <span>{i.quantity}</span>

                    <button
                      className="btn"
                      onClick={() =>
                        updateQuantity(
                          i.product._id,
                          i.quantity,
                          1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Item Total: ₹{" "}
                    {i.product.price * i.quantity}
                  </p>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      removeFromCart(i.product._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              ) : null
            )}

            <h3 style={{ marginTop: "20px" }}>
              Grand Total: ₹ {total}
            </h3>

            {/* ✅ FIX: GO TO CHECKOUT */}
            <button
              className="btn btn-primary"
              style={{ marginTop: "15px" }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
