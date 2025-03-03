const Stripe = require("stripe");
const Order = require("../models/Order");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process Payment
const processPayment = async (req, res) => {
    try {
        const { orderId, token } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Create Stripe charge
        const charge = await stripe.charges.create({
            amount: order.totalPrice * 100, // Convert to cents
            currency: "usd",
            source: token,
            description: `Payment for Order #${order.id}`,
        });

        // Update order status
        order.status = "Paid";
        order.paymentDetails = charge.id;
        await order.save();

        res.status(200).json({ message: "Payment successful", charge });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { processPayment };
