import { useState, useEffect } from "react";
import { shops } from "../data/shopsData"; // Import shops to get delivery fees

export const useCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("shopCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [deliveryOptions, setDeliveryOptions] = useState(() => {
    const savedOptions = localStorage.getItem("deliveryOptions");
    return savedOptions ? JSON.parse(savedOptions) : {}; // ✅ CHANGED: Object per shop
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("shopCart", JSON.stringify(cartItems));
    localStorage.setItem("deliveryOptions", JSON.stringify(deliveryOptions));
  }, [cartItems, deliveryOptions]);

  // ✅ CHANGED: Group cart items by shop
  const cartItemsByShop = cartItems.reduce((acc, item) => {
    const shop = shops.find(s => s.products.some(p => p.id === item.id));
    if (shop) {
      if (!acc[shop.id]) {
        acc[shop.id] = {
          shop,
          items: []
        };
      }
      acc[shop.id].items.push(item);
    }
    return acc;
  }, {});

  // ✅ CHANGED: Calculate delivery fees per shop
  const deliveryFees = Object.entries(cartItemsByShop).reduce((fees, [shopId, shopData]) => {
    const deliveryOption = deliveryOptions[shopId];
    if (deliveryOption === "Delivery") {
      fees[shopId] = shopData.shop.deliveryFee;
    } else {
      fees[shopId] = 0;
    }
    return fees;
  }, {});

  // ✅ CHANGED: Calculate totals
  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDeliveryFee = Object.values(deliveryFees).reduce((sum, fee) => sum + fee, 0);
  const cartTotal = itemsTotal + totalDeliveryFee;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ CHANGED: Update addToCart to handle delivery options per shop
  const addToCart = (product, option, shopId) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // ✅ NEW: Set delivery option for this specific shop
    if (option) {
      setDeliveryOptions(prev => ({
        ...prev,
        [shopId]: option
      }));
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ NEW: Update delivery option for a specific shop
  const updateDeliveryOption = (shopId, option) => {
    setDeliveryOptions(prev => ({
      ...prev,
      [shopId]: option
    }));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDeliveryOptions({});
  };

  return {
    cartItems,
    cartItemsByShop, // ✅ NEW: Items grouped by shop
    deliveryOptions, // ✅ CHANGED: Now an object
    deliveryFees, // ✅ NEW: Delivery fees per shop
    itemsTotal,
    totalDeliveryFee, // ✅ CHANGED: Total of all delivery fees
    cartTotal,
    totalItems,
    addToCart,
    removeFromCart,
    updateDeliveryOption, // ✅ NEW: Update delivery per shop
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};