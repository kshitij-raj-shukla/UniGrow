const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Product = require("./product");

const Order = sequelize.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, 
            key: "id",
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
        defaultValue: "Pending",
    },
});

module.exports = Order;
