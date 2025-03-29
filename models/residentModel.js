const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    role: { type: String, enum: ["resident", "admin", "security"], required: true },
    roomNo: { type: String, required: true },
    profileImage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("resident", residentSchema);
