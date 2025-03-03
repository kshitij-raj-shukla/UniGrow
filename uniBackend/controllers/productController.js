const Product = require("../models/product");  // ✅ Ensure Product model is imported

exports.getLandingProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ limit: 5 }); // Fetch limited products
        res.json(products);
    } catch (error) {
        console.error("Error fetching landing products:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};



// 🔹 Add New Product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, stock, image } = req.body; 
        const product = await Product.create({ name,description, price, stock, image });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 🔹 Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 🔹 Update Product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const { name, price, stock, image } = req.body;
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.image = image || product.image;

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 🔹 Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
