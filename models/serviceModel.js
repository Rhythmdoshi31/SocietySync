const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true }, // ✅ Reference Resident model
    category: { 
        type: String, 
        enum: ["plumbing", "electrical", "carpentry", "cleaning", "masonry", "painting", "other"], 
        required: true 
    },
    description: { type: String, required: true },
    image: { type: String, default: null }, // ✅ Optional image URL
    status: { 
        type: String, 
        enum: ["pending", "in-progress", "resolved"], 
        default: "pending" 
    },
    requestTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("service", serviceSchema);
