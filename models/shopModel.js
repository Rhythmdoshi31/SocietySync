const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    owner: { type: String, required: true },
    contact: { type: String, required: true },
    availableItems: [
        {
            item: { type: String, required: true },
            price: { type: Number, required: true },
            unit: { type: String, required: true }
        }
    ],
    status: { type: String, enum: ["pending", "accepted", "packed"], default: "pending" }
});

module.exports = mongoose.model("shop", shopSchema);
