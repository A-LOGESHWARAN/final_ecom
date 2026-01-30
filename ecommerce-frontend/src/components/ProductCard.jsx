import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // BUYER / SELLER / ADMIN
  const isOutOfStock = product.stock <= 0;

  const addToCart = async () => {
    if (isOutOfStock) return;

    // require buyer login to add to cart
    if (role !== "BUYER") {
      toast.info("Please login as a Buyer to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart", {
        productId: product._id,
        quantity
      });

      toast.success(`${quantity} ${product.name} added to cart 🛒`);
    } catch (err) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="buyer-product-card">
      {/* PRODUCT IMAGE */}
      <img
        src={product.image || ""}
        alt={product.name}
        style={{
          opacity: isOutOfStock ? 0.6 : 1
        }}
      />

      <h3>{product.name}</h3>
      <p className="buyer-product-price">₹ {product.price}</p>

      {/* SELLER NAME (BUYER ONLY) */}
      {role === "BUYER" && product.seller && (
        <p className="buyer-product-seller">
          Sold by:{" "}
          <strong>
            {product.seller.name || product.seller.email}
          </strong>
        </p>
      )}

      {/* STOCK STATUS */}
      <p
        className={`buyer-product-stock ${
          isOutOfStock ? "out-of-stock" : "in-stock"
        }`}
      >
        {isOutOfStock
          ? "❌ Out of Stock"
          : `✅ In Stock: ${product.stock}`}
      </p>

      {/* QUANTITY (ONLY IF IN STOCK) */}
      {!isOutOfStock && (
        <div className="buyer-quantity-control">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={e =>
              setQuantity(
                Math.min(
                  product.stock,
                  Math.max(1, Number(e.target.value))
                )
              )
            }
          />
        </div>
      )}

      {/* ADD TO CART */}
      <button
        className="buyer-add-to-cart-btn"
        onClick={addToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock
          ? "❌ Unavailable"
          : role !== "BUYER"
          ? "🔒 Login to Buy"
          : "🛒 Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
