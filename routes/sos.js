const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Render SOS Emergency Page
router.get("/", authMiddleware, (req, res) => {
    res.render("sos");
});

// ✅ Handle Sending Emergency Alert
router.post("/send-alert", authMiddleware, (req, res) => {
    try {
        console.log(`🚨 Emergency alert sent by user: ${req.resident.id}`);
        res.status(200).send("Emergency alert sent successfully!");
    } catch (error) {
        console.error("❌ Error sending emergency alert:", error);
        res.status(500).send("Error sending alert.");
    }
});

module.exports = router;
