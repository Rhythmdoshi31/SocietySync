const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    location: { type: String, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "resident" }]
});

module.exports = mongoose.model("event", EventSchema);
