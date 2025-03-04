const express = require("express");
const {
    getProducts,
    getLandingProducts,  // ✅ Ensure this is imported correctly
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Landing page products (PUBLIC route)
router.get("/landing", getLandingProducts); 

// ✅ All products (PROTECTED route)
router.get("/", protect, getProducts);

router.post("/", protect, admin, addProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
