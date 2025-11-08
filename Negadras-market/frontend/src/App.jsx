import React, { useState } from "react";
import ShopList from "./pages/ShopList";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState("customer"); // "customer" or "admin"

  return (
    <div className="App">
      {/* Navigation Bar */}
      <div style={{
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ margin: 0, color: "#333" }}>🛍️ Segno Gebeya</h1>
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setCurrentView("customer")}
            style={{
              padding: "8px 16px",
              backgroundColor: currentView === "customer" ? "#007bff" : "transparent",
              color: currentView === "customer" ? "white" : "#007bff",
              border: "1px solid #007bff",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Customer View
          </button>
          
          <button
            onClick={() => setCurrentView("admin")}
            style={{
              padding: "8px 16px",
              backgroundColor: currentView === "admin" ? "#28a745" : "transparent",
              color: currentView === "admin" ? "white" : "#28a745",
              border: "1px solid #28a745",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Shop Owner
          </button>
        </div>
      </div>

      {/* Main Content */}
      {currentView === "customer" ? (
        <ShopList />
      ) : isAdmin ? (
        <AdminDashboard />
      ) : (
        <AdminLogin onLoginSuccess={() => setCurrentView("admin")} />
      )}
    </div>
  );
}

export default App;