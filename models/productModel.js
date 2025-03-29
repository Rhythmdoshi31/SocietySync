const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String // ✅ Store product category
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
