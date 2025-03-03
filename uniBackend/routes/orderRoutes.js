const express = require("express");
const { placeOrder, getMyOrders, getAllOrders, cancelOrder, updateOrderStatus } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);
router.get("/all", protect, admin, getAllOrders);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
