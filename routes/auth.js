const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Resident = require("../models/residentModel");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to check authentication
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const resident = await Resident.findById(req.resident.id);
        if (!resident) return res.status(404).send("Resident not found");
        res.render("profile", { resident });
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).send("Error fetching profile");
    }
});


// Handle Resident Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, mobile, role, roomNo, society } = req.body;

        // Check if resident already exists
        const existingResident = await Resident.findOne({ email });
        if (existingResident) {
            return res.status(400).send("Resident already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newResident = new Resident({ name, email, password: hashedPassword, mobile, role, roomNo, society });
        await newResident.save();

        console.log("✅ Resident registered successfully");
        res.redirect("/"); // Redirect to Home Page
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Error registering resident");
    }
});
router.get("/register", (req, res) => {
    res.render("register"); // Ensure you have a 'register.ejs' file in your views folder
});

// Show Login Page
router.get("/login", (req, res) => {
    res.render("login", { error: null }); // Ensure 'views/login.ejs' exists
});

// Handle Resident Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const resident = await Resident.findOne({ email });

        if (!resident || !(await bcrypt.compare(password, resident.password))) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign({ id: resident._id }, "SECRET_KEY", { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: false, // ✅ Allows browser access for debugging
            secure: false, // ✅ Set to true only if using HTTPS
            sameSite: "Lax", // ✅ Ensures browser stores the cookie
        });

        console.log("✅ Token set in cookie:", token);
        res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Error logging in");
    }
});



// View Profile (Requires Authentication)
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const resident = await Resident.findById(req.resident.id);
        if (!resident) return res.status(404).send("Resident not found");
        res.render("profile", { resident }); // Ensure 'views/profile.ejs' exists
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).send("Error fetching profile");
    }
});

// Edit Profile (Requires Authentication)
router.post("/profile/edit", authMiddleware, async (req, res) => {
    try {
        const { name, mobile } = req.body;
        await Resident.findByIdAndUpdate(req.resident.id, { name, mobile });
        res.redirect("/auth/profile");
    } catch (error) {
        console.error("Profile edit error:", error);
        res.status(500).send("Error updating profile");
    }
});

// Resident Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/auth/login");
});

module.exports = router;
