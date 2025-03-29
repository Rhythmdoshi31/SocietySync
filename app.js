const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require('./config/db'); // MongoDB connection
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Default to 3000 if not set in .env

// Set up EJS as the view engine
app.set("trust proxy", 1); // ✅ Enables proxy support
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cookieParser()); // ✅ Ensure cookie-parser is used before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const serviceRoutes = require("./routes/service");
const sosRoutes = require("./routes/sos");
// const securityRoutes = require("./routes/security");
const shopRoutes = require("./routes/shop");

// Use Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/service-requests", serviceRoutes);
app.use("/sos", sosRoutes);
// app.use("/security", securityRoutes);
app.use("/shop", shopRoutes);


// Home Route
app.get('/', (req, res) => {
    res.render("home"); // ✅ Ensure 'views/home.ejs' exists
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
