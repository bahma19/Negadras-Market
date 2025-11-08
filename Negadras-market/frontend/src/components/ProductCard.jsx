import React from "react";

const ProductCard = ({ product, onAddToCart, shopId }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        width: "200px",
        backgroundColor: "#fafafa",
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: {product.price} ETB</p>
      <div style={{ display: "flex", gap: "5px" }}>
        <button
          onClick={() => onAddToCart(product, "Pickup", shopId)} // ✅ UPDATED: Pass shopId
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "5px 8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Pickup
        </button>
        <button
          onClick={() => onAddToCart(product, "Delivery", shopId)} // ✅ UPDATED: Pass shopId
          style={{
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            padding: "5px 8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delivery
        </button>
      </div>
    </div>
  );
};

export default ProductCard;