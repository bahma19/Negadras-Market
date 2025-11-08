import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ shop, onAddToCart }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "2px solid #ddd",
        paddingTop: "15px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{shop.name} - Products</h2>
      <p style={{ color: "#666", marginBottom: "15px" }}>
        Delivery fee: <strong>{shop.deliveryFee} ETB</strong>
      </p>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {shop.products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product} 
            shopId={shop.id} // ✅ NEW: Pass shop ID
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;