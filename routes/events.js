const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Render Events Page
router.get("/", authMiddleware, (req, res) => {
    const events = [
        { title: "Community Cleanup", date: "April 15, 2025", location: "Central Park" },
        { title: "Tech Workshop", date: "April 20, 2025", location: "City Library" },
        { title: "Health Awareness Camp", date: "April 25, 2025", location: "Community Hall" }
    ];

    res.render("events", { events });
});

module.exports = router;
