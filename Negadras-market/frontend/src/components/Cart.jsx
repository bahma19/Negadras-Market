import React from "react";

const Cart = ({
  cartItems = [],
  cartItemsByShop = {}, // ✅ ADD DEFAULT VALUE
  deliveryOptions = {}, // ✅ ADD DEFAULT VALUE
  deliveryFees = {}, // ✅ ADD DEFAULT VALUE
  itemsTotal = 0,
  totalDeliveryFee = 0,
  cartTotal = 0,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onUpdateDeliveryOption,
  onClear,
  totalItems = 0,
}) => {
  // ✅ ADD SAFE ACCESS WITH DEFAULTS
  const safeCartItemsByShop = cartItemsByShop || {};
  const safeDeliveryOptions = deliveryOptions || {};
  const safeDeliveryFees = deliveryFees || {};
  
  const shopCount = Object.keys(safeCartItemsByShop).length;
  const deliveryShopCount = Object.keys(safeCartItemsByShop).filter(id => safeDeliveryOptions[id] === "Delivery").length;

  return (
    <div style={{ marginTop: "30px", borderTop: "2px solid #ddd", paddingTop: "15px" }}>
      {/* Cart Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>🛒 Shopping Cart</h2>
          {totalItems > 0 && (
            <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "14px" }}>
              {totalItems} item{totalItems !== 1 ? 's' : ''} in cart • {shopCount} shop{shopCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {cartItems.length > 0 && (
          <button onClick={onClear} style={{ backgroundColor: "#ff9800", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666", backgroundColor: "#f8f9fa", borderRadius: "8px", marginTop: "20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>🛒</div>
          <h3 style={{ margin: "0 0 10px 0" }}>Your cart is empty</h3>
          <p style={{ margin: 0 }}>Add some products to get started!</p>
        </div>
      ) : (
        <>
          {/* Show items grouped by shop */}
          {Object.entries(safeCartItemsByShop).map(([shopId, shopData]) => {
            const shop = shopData.shop;
            const shopItems = shopData.items || [];
            const shopDeliveryOption = safeDeliveryOptions[shopId] || "Pickup";
            const shopDeliveryFee = safeDeliveryFees[shopId] || 0;
            const shopItemsTotal = shopItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shopTotal = shopItemsTotal + shopDeliveryFee;

            return (
              <div key={shopId} style={{ marginBottom: "30px", border: "1px solid #e9ecef", borderRadius: "10px", overflow: "hidden" }}>
                {/* Shop Header */}
                <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  <h3 style={{ margin: 0, color: "#333" }}>🏪 {shop.name}</h3>
                  <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "14px" }}>{shop.category}</p>
                </div>

                {/* Delivery Option for this Shop */}
                <div style={{ padding: "15px", backgroundColor: "#fafafa", borderBottom: "1px solid #e9ecef" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold" }}>Delivery Option:</span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => onUpdateDeliveryOption && onUpdateDeliveryOption(shopId, "Pickup")}
                        style={{
                          backgroundColor: shopDeliveryOption === "Pickup" ? "#28a745" : "#f8f9fa",
                          color: shopDeliveryOption === "Pickup" ? "white" : "#333",
                          border: "1px solid #28a745",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Pickup 🏪
                      </button>
                      <button
                        onClick={() => onUpdateDeliveryOption && onUpdateDeliveryOption(shopId, "Delivery")}
                        style={{
                          backgroundColor: shopDeliveryOption === "Delivery" ? "#2196f3" : "#f8f9fa",
                          color: shopDeliveryOption === "Delivery" ? "white" : "#333",
                          border: "1px solid #2196f3",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Delivery 🚚 ({shop.deliveryFee} ETB)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Shop Items */}
                <div style={{ padding: "15px" }}>
                  {shopItems.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold" }}>{item.name}</div>
                        <div style={{ color: "#666", fontSize: "14px" }}>{item.price} ETB each</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#f8f9fa", padding: "8px 12px", borderRadius: "8px" }}>
                        <button 
                          onClick={() => onDecreaseQuantity && onDecreaseQuantity(item.id)} 
                          disabled={item.quantity <= 1} 
                          style={{ 
                            backgroundColor: item.quantity > 1 ? "#6c757d" : "#e9ecef", 
                            color: item.quantity > 1 ? "white" : "#999", 
                            border: "none", 
                            width: "32px", 
                            height: "32px", 
                            borderRadius: "50%", 
                            cursor: item.quantity > 1 ? "pointer" : "not-allowed", 
                            fontSize: "16px", 
                            fontWeight: "bold" 
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
                        <button 
                          onClick={() => onIncreaseQuantity && onIncreaseQuantity(item.id)} 
                          style={{ 
                            backgroundColor: "#28a745", 
                            color: "white", 
                            border: "none", 
                            width: "32px", 
                            height: "32px", 
                            borderRadius: "50%", 
                            cursor: "pointer", 
                            fontSize: "16px", 
                            fontWeight: "bold" 
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div style={{ fontWeight: "bold", minWidth: "80px", textAlign: "right" }}>{item.price * item.quantity} ETB</div>
                      <button 
                        onClick={() => onRemove && onRemove(item.id)} 
                        style={{ 
                          backgroundColor: "#dc3545", 
                          color: "white", 
                          border: "none", 
                          padding: "8px 12px", 
                          borderRadius: "6px", 
                          cursor: "pointer", 
                          fontSize: "14px", 
                          fontWeight: "bold" 
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Shop Summary */}
                <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderTop: "1px solid #e9ecef" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span>Items subtotal:</span>
                    <span>{shopItemsTotal} ETB</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginTop: "5px" }}>
                    <span>Delivery:</span>
                    <span>{shopDeliveryFee} ETB</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #dee2e6" }}>
                    <span>Shop Total:</span>
                    <span>{shopTotal} ETB</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Order Summary */}
          <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px", border: "1px solid #e9ecef" }}>
            <h3 style={{ marginTop: 0, color: "#333" }}>Order Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                
              <span>Items ({totalItems}):</span>
              <span>{itemsTotal} ETB</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>Delivery ({deliveryShopCount} shops):</span>
              <span>{totalDeliveryFee} ETB</span>
              </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", paddingTop: "15px", borderTop: "2px solid #dee2e6", fontWeight: "bold", fontSize: "18px", color: "#333" }}>
                <span>Total:</span>
                <span>{cartTotal} ETB</span>
            </div>
          </div>

          {/* Checkout Button */}
            <div style={{ textAlign: "center", marginTop: "25px" }}>
                <button style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "15px 30px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#218838";
                    e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#28a745";
                    e.target.style.transform = "translateY(0)";
                }}>
                    Proceed to Checkout
                </button>
                <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>Secure payment . Free returns . 24/7 support</p>
            </div>
        </>
        )}
    </div>
    );
};

export default Cart;