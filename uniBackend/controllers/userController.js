const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// ✅ Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// ✅ Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

// ✅ Get User Profile (Protected)
const getUserProfile = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
