import React from "react";

const ShopCard = ({ shop, isSelected, onClick, productCount }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        width: "250px",
        backgroundColor: isSelected ? "#e0f7fa" : "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <h2 style={{ fontWeight: "600", margin: "0 0 5px 0" }}>{shop.name}</h2>
      <p style={{ color: "#555", margin: "0 0 5px 0" }}>{shop.category}</p>
      {/* Show product count when provided */}
      {productCount !== undefined && (
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
          {productCount} product{productCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default ShopCard;