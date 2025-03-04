const Cart = require('../models/Cart');
const Product = require('../models/product');


exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Extract user from JWT

        let cart = await Cart.findOne({ where: { userId, productId } });

        if (cart) {
            cart.quantity += quantity;
            await cart.save();
        } else {
            cart = await Cart.create({ userId, productId, quantity });
        }

        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findAll({ where: { userId: req.user.id }, include: Product });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
