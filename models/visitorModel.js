const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "resident", required: true },
    visitorName: { type: String, required: true },
    visitorMobile: { type: String, required: true },
    visitorImage: { type: String }, // Photo of visitor
    otp: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date }
});

module.exports = mongoose.model("visitor", VisitorSchema);
