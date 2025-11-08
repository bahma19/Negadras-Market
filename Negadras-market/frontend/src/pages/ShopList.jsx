import React, { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ShopCard from "../components/ShopCard";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { shops, categories } from "../data/shopsData";
import { useCart } from "../hooks/useCart";

const ShopList = () => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  
  // In your ShopList.jsx, update the useCart destructuring:
const {
  cartItems,
  cartItemsByShop,
  deliveryOptions,
  deliveryFees,
  itemsTotal,
  totalDeliveryFee,
  cartTotal,
  totalItems,
  addToCart,
  removeFromCart,
  updateDeliveryOption,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = useCart();

// And update the Cart component props:
<Cart
  cartItems={cartItems}
  cartItemsByShop={cartItemsByShop}
  deliveryOptions={deliveryOptions}
  deliveryFees={deliveryFees}
  itemsTotal={itemsTotal}
  totalDeliveryFee={totalDeliveryFee}
  cartTotal={cartTotal}
  totalItems={totalItems}
  onRemove={removeFromCart}
  onIncreaseQuantity={increaseQuantity}
  onDecreaseQuantity={decreaseQuantity}
  onUpdateDeliveryOption={updateDeliveryOption}
  onClear={clearCart}
/>

  // Get all products for search (flatten all shop products)
  const allProducts = shops.flatMap(shop => 
    shop.products.map(product => ({
      ...product,
      shopName: shop.name,
      shopCategory: shop.category,
      shopId: shop.id
    }))
  );

  // Search and filter logic
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shopName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategory === "All" || product.shopCategory === selectedCategory;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Group filtered products by shop for display
  const shopsWithFilteredProducts = shops.map(shop => ({
    ...shop,
    products: filteredProducts.filter(product => product.shopId === shop.id)
  })).filter(shop => shop.products.length > 0);

  const filteredShops = selectedCategory === "All"
    ? shops
    : shops.filter((shop) => shop.category === selectedCategory);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Shops</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search products or shops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "25px",
            fontSize: "16px",
            outline: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      {/* Price Filter */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        backgroundColor: "#f8f9fa", 
        borderRadius: "8px",
        border: "1px solid #e9ecef"
      }}>
        <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>Price Range: {priceRange[0]} - {priceRange[1]} ETB</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span>0 ETB</span>
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={{ flex: 1 }}
          />
          <span>20,000 ETB</span>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSelectedShop(null);
          setSearchTerm("");
        }}
      />

      {/* Search Results OR Normal Shop List */}
      {searchTerm || priceRange[1] < 20000 ? (
        // Search Results View
        <div>
          <h2 style={{ marginBottom: "15px", color: "#666" }}>
            {filteredProducts.length} products found
            {searchTerm && ` for "${searchTerm}"`}
          </h2>
          
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
            {shopsWithFilteredProducts.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                isSelected={selectedShop?.id === shop.id}
                onClick={() => setSelectedShop(shop)}
                productCount={shop.products.length}
              />
            ))}
          </div>

          {/* Show products from all shops that match search */}
          {shopsWithFilteredProducts.length > 0 && (
            <div style={{ marginTop: "30px" }}>
              <h2 style={{ marginBottom: "15px" }}>Search Results</h2>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {filteredProducts.map((product) => (
                  <div
                    key={`${product.id}-${product.shopId}`}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      width: "200px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <h3 style={{ margin: "0 0 5px 0" }}>{product.name}</h3>
                    <p style={{ margin: "0 0 5px 0", color: "#666", fontSize: "14px" }}>
                      {product.shopName}
                    </p>
                    <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
                      {product.price} ETB
                    </p>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => addToCart(product, "Pickup")}
                        style={{
                          backgroundColor: "#4caf50",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                      >
                        Pickup
                      </button>
                      <button
                        onClick={() => addToCart(product, "Delivery")}
                        style={{
                          backgroundColor: "#2196f3",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                      >
                        Delivery
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div style={{ 
              textAlign: "center", 
              padding: "40px", 
              color: "#666" 
            }}>
              <h3>No products found</h3>
              <p>Try adjusting your search or price range</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange([0, 20000]);
                }}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        // Normal Shop View (when no search)
        <>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                isSelected={selectedShop?.id === shop.id}
                onClick={() => setSelectedShop(shop)}
              />
            ))}
          </div>

          {selectedShop && <ProductList shop={selectedShop} onAddToCart={addToCart} />}
        </>
      )}

      {/* Cart Section */}
      <Cart
        cartItems={cartItems}
        deliveryOption={deliveryOptions}
        deliveryFee={deliveryFees}
        itemsTotal={itemsTotal}
        cartTotal={cartTotal}
        totalItems={totalItems}
        onRemove={removeFromCart}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onClear={clearCart}
      />
    </div>
  );
};

export default ShopList;