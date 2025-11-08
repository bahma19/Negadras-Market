export const shops = [
  {
    id: 1,
    name: "Abebe Electronics",
    category: "Electronics",
    deliveryFee: 150, // ✅ NEW: Per-store delivery fee
    products: [
      { id: 1, name: "Phone", price: 5000 },
      { id: 2, name: "Laptop", price: 15000 },
    ],
  },
  {
    id: 2,
    name: "Selam Grocery",
    category: "Grocery",
    deliveryFee: 50, // ✅ NEW: Per-store delivery fee
    products: [
      { id: 3, name: "Rice", price: 150 },
      { id: 4, name: "Oil", price: 200 },
    ],
  },
  {
    id: 3,
    name: "Habesha Clothes",
    category: "Clothing",
    deliveryFee: 80, // ✅ NEW: Per-store delivery fee
    products: [
      { id: 5, name: "Shirt", price: 500 },
      { id: 6, name: "Jeans", price: 1000 },
    ],
  },
];

export const categories = ["All", "Electronics", "Grocery", "Clothing"];