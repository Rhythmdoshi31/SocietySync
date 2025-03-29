const mongoose = require("mongoose");

const theftReportSchema = new mongoose.Schema({
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "resident", required: true },
    description: { type: String, required: true },
    media: [{ type: String }], // Images or videos
    reportedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["reported", "investigating", "resolved"], default: "reported" }
});

module.exports = mongoose.model("theftReport", theftReportSchema);
