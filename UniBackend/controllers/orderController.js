const Order = require("../models/Order");
const Product = require("../models/product");
const User = require("../models/user");

// Place a new order
const placeOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const totalPrice = product.price * quantity;

        const order = await Order.create({ userId, productId, quantity, totalPrice });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders for logged-in user
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: Product, attributes: ["name", "price"] }],
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, attributes: ["name", "email"] },
                { model: Product, attributes: ["name", "price"] },
            ],
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel an Order (User)
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.userId !== req.user.id)
            return res.status(403).json({ message: "Not authorized to cancel this order" });

        if (order.status !== "Pending")
            return res.status(400).json({ message: "Order cannot be cancelled" });

        order.status = "Cancelled";
        await order.save();

        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = req.body.status;
        await order.save();

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeOrder, getMyOrders, getAllOrders, cancelOrder, updateOrderStatus };
