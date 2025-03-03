const asyncHandler = require("express-async-handler");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Order } = require("../models/Order");

// Get all users (Admin only)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Delete a user (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// Get all orders (Admin only)
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({ include: [{ model: User, attributes: ["name", "email"] }] });
    res.json(orders);
});

// Update order status (Admin only)
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (order) {
        order.status = req.body.status || order.status;
        await order.save();
        res.json({ message: "Order status updated" });
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// Get all products (Admin only)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// Delete a product (Admin only)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
        await product.destroy();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

module.exports = {
    getUsers,
    deleteUser,
    getOrders,
    updateOrderStatus,
    getProducts,
    deleteProduct
};
