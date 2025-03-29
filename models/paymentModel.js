const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "resident", required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentMethod: { type: String, enum: ["credit_card", "UPI", "net_banking", "cash"], required: true },
    transactionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("payment", paymentSchema);
