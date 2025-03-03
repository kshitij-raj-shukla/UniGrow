const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Generate JWT Token
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
    });

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id, user.isAdmin),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id, user.isAdmin),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Get User Profile (Protected)
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (user) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Update User Profile (Protected)
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser.id, updatedUser.isAdmin),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
