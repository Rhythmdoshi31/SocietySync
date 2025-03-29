const mongoose = require("mongoose");

const SecurityCamSchema = new mongoose.Schema({
    cameraName: { type: String, required: true },
    location: { type: String, required: true },
    streamURL: { type: String },
    status: { type: String, enum: ["active", "offline"], default: "active" },
    lastChecked: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SecurityCam", SecurityCamSchema);
