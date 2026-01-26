import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const role = localStorage.getItem("role"); // BUYER / SELLER / ADMIN
  const isOutOfStock = product.stock <= 0;

  const addToCart = async () => {
    if (isOutOfStock) return;

    try {
      await api.post("/cart", {
        productId: product._id,
        quantity
      });

      toast.success(
        `${quantity} ${product.name} added to cart 🛒`
      );
    } catch (err) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px"
      }}
    >
      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          opacity: isOutOfStock ? 0.5 : 1
        }}
      />

      <h3 className="mt-2">{product.name}</h3>
      <p className="text-muted">₹ {product.price}</p>

      {/* ✅ SELLER NAME (BUYER ONLY) */}
      {role === "BUYER" && product.seller && (
        <p style={{ fontSize: "14px", color: "#555" }}>
          Sold by:{" "}
          <strong>
            {product.seller.name ||
              product.seller.email}
          </strong>
        </p>
      )}

      {/* STOCK STATUS */}
      <p
        style={{
          color: isOutOfStock ? "red" : "green",
          fontWeight: "bold"
        }}
      >
        {isOutOfStock
          ? "Out of Stock"
          : `In Stock: ${product.stock}`}
      </p>

      {/* QUANTITY (ONLY IF IN STOCK) */}
      {!isOutOfStock && (
        <div className="d-flex align-items-center mb-3">
          <label className="me-2">Qty:</label>
          <input
            type="number"
            className="form-control"
            style={{ width: "70px" }}
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
        className={`btn ${
          isOutOfStock
            ? "btn-secondary"
            : "btn-primary"
        } w-100`}
        onClick={addToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock
          ? "Unavailable"
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
