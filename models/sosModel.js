const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, default: "Emergency! Please respond immediately." },
    location: { type: String }, // Optional location details
    alertType: { type: String, enum: ["fire", "medical", "intruder", "else"], default: "else"},
    status: { type: String, enum: ["active", "resolved"], default: "active" },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SOS", sosSchema);
