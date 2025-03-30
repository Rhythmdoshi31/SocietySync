const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Event = require("../models/eventModel"); // Import the Event model

// ✅ Fetch all events from MongoDB
router.get("/", authMiddleware, async (req, res) => {
    try {
        const events = await Event.find(); // Fetch events from DB
        res.render("events", { events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Server Error");
    }
});

// ✅ Fetch a single event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // Fetch event by ID
        if (!event) {
            return res.status(404).send("Event not found");
        }

        // Fetch attendees from UserModel (assuming `attendees` stores user IDs)
        const User = require("../models/userModel");
        const attendees = await User.find({ _id: { $in: event.attendees } }, "name");

        res.render("event-details", { event, attendees }); // ✅ Pass `event` and `attendees` to EJS
    } catch (error) {
        console.error("❌ Error fetching event:", error);
        res.status(500).send("Server Error");
    }
});

// Attend event
router.post("/:id/attend", async (req, res) => {
    try {
        const eventId = req.params.id.trim();
        const userId = req.user._id; // Assuming user is authenticated

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).send("Event not found");

        if (!event.attendees.includes(userId)) {
            event.attendees.push(userId);
            await event.save();
        }

        res.redirect(`/events/${eventId}`);
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).send("Server Error");
    }
});

// Not attending event (Remove user from attendees)
router.post("/:id/not-attending", async (req, res) => {
    try {
        const eventId = req.params.id.trim();
        const userId = req.user._id; // Assuming user is authenticated

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).send("Event not found");

        event.attendees = event.attendees.filter(id => id.toString() !== userId.toString());
        await event.save();

        res.redirect(`/events/${eventId}`);
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, date, location, description } = req.body;

        if (!title || !date || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({ title, date, location, description });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
