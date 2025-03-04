const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Products", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,  // Automatically adds createdAt & updatedAt
});

module.exports = Product;
