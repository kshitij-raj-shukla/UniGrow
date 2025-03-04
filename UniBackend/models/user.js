const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("Users", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: false  // 👈 Disable timestamps
});

module.exports = User;
 