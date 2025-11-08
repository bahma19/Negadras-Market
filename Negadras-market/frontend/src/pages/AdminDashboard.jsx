import React, { useState } from "react";
import { shops as initialShops } from "../data/shopsData";
import { useAuth } from "../hooks/useAuth";

const AdminDashboard = () => {
  const [shops, setShops] = useState(initialShops);
  const [selectedShop, setSelectedShop] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const { logout } = useAuth();

  const addProduct = (shopId) => {
    if (!newProduct.name || !newProduct.price) return;

    setShops(prevShops =>
      prevShops.map(shop =>
        shop.id === shopId
          ? {
              ...shop,
              products: [
                ...shop.products,
                {
                  id: Math.max(...shop.products.map(p => p.id)) + 1,
                  name: newProduct.name,
                  price: parseInt(newProduct.price)
                }
              ]
            }
          : shop
      )
    );

    setNewProduct({ name: "", price: "" });
  };

  const updateProductPrice = (shopId, productId, newPrice) => {
    setShops(prevShops =>
      prevShops.map(shop =>
        shop.id === shopId
          ? {
              ...shop,
              products: shop.products.map(product =>
                product.id === productId
                  ? { ...product, price: parseInt(newPrice) }
                  : product
              )
            }
          : shop
      )
    );
  };

  const deleteProduct = (shopId, productId) => {
    setShops(prevShops =>
      prevShops.map(shop =>
        shop.id === shopId
          ? {
              ...shop,
              products: shop.products.filter(product => product.id !== productId)
            }
          : shop
      )
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Shop Owner Dashboard</h1>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Shop Selection */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "15px" }}>Manage Your Shop</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {shops.map(shop => (
            <button
              key={shop.id}
              onClick={() => setSelectedShop(shop)}
              style={{
                padding: "15px 20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: selectedShop?.id === shop.id ? "#e0f7fa" : "#fff",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              {shop.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Management */}
      {selectedShop && (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "20px" }}>Manage Products for {selectedShop.name}</h3>
          
          {/* Add New Product */}
          <div style={{ marginBottom: "30px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
            <h4>Add New Product</h4>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", flex: 1 }}
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "120px" }}
              />
              <button
                onClick={() => addProduct(selectedShop.id)}
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Existing Products */}
          <div>
            <h4>Existing Products</h4>
            {selectedShop.products.map(product => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                  marginBottom: "10px"
                }}
              >
                <span style={{ fontWeight: "bold", flex: 1 }}>{product.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => updateProductPrice(selectedShop.id, product.id, e.target.value)}
                    style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "4px", width: "100px" }}
                  />
                  <span>ETB</span>
                  <button
                    onClick={() => deleteProduct(selectedShop.id, product.id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;