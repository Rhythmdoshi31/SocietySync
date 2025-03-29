const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        const categories = Array.from(new Set(products.map(p => p.category))); // Ensure categories is an array

        res.render("shop", { products, categories });
    } catch (error) {
        console.error("❌ Error fetching shop data:", error);
        res.status(500).send("Error loading shop");
    }
});

module.exports = router;
