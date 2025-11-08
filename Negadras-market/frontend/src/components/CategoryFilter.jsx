import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            marginRight: "10px",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: selectedCategory === cat ? "#e0f7fa" : "#fff",
            cursor: "pointer",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
