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
        <div className="container">
          <div className="cart-loading">🔄 Loading cart...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="cart-header">
          <h2>🛒 My Cart</h2>
        </div>

        {cart.items.length === 0 ? (
          <div className="cart-empty-state">
            <p>😔 Your cart is empty. Start shopping to add items!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "32px" }}>
            <div>
              {cart.items.map(i =>
                i.product ? (
                  <div key={i.product._id} className="cart-item-card">
                    <img
                      src={i.product.image}
                      alt={i.product.name}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/120x120?text=No+Image";
                      }}
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{i.product.name}</h3>
                      <p className="cart-item-price">₹ {i.product.price} per item</p>
                      
                      <div className="cart-quantity-controls">
                        <button
                          className="cart-quantity-btn"
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
                        <span className="cart-quantity-display">{i.quantity}</span>
                        <button
                          className="cart-quantity-btn"
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

                      <p className="cart-item-total">
                        Item Total: ₹ {i.product.price * i.quantity}
                      </p>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() =>
                        removeFromCart(i.product._id)
                      }
                    >
                      🗑️ Remove
                    </button>
                  </div>
                ) : null
              )}
            </div>

            <div className="cart-summary">
              <h3>💰 Order Summary</h3>
              <div className="cart-grand-total">
                Grand Total: ₹ {total}
              </div>
              <button
                className="cart-checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                🛒 Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
