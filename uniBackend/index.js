const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require('./middleware/errorMiddleware');
const sequelize = require('./config/db');
dotenv.config();
const app = express();
app.use(express.json());
app.use(errorHandler);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);


sequelize.sync({ force: true })  // This will recreate all tables
  .then(() => console.log("✅ Database synced successfully"))
  .catch((err) => console.error("❌ Database Sync Error:", err));
// Database connection
db.sync()
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database connection failed:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
