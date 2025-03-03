const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
    getUsers,
    deleteUser,
    getOrders,
    updateOrderStatus,
    getProducts,
    deleteProduct
} = require("../controllers/adminController");

// Manage users
router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

// Manage orders
router.get("/orders", protect, admin, getOrders);
router.put("/orders/:id", protect, admin, updateOrderStatus);

// Manage products
router.get("/products", protect, admin, getProducts);
router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;
