const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

sequelize.authenticate()
    .then(() => console.log("✅ MySQL Database Connected"))
    .catch(err => console.log("❌ Error: " + err));

module.exports = sequelize;
