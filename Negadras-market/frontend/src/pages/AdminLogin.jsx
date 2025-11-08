import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(username, password)) {
      onLoginSuccess();
    } else {
      setError("Invalid credentials. Use: admin / admin123");
    }
  };

  return (
    <div style={{ 
      padding: "40px", 
      fontFamily: "Arial, sans-serif",
      maxWidth: "400px",
      margin: "100px auto",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Shop Owner Login
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px"
            }}
            required
          />
        </div>

        {error && (
          <div style={{ 
            color: "red", 
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            borderRadius: "5px"
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login as Shop Owner
        </button>
      </form>

      <div style={{ 
        marginTop: "20px", 
        padding: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        fontSize: "14px"
      }}>
        <strong>Demo Credentials:</strong><br />
        Username: admin<br />
        Password: admin123
      </div>
    </div>
  );
};

export default AdminLogin;