const express = require('express');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const connectDB = require('./configs/mongodb-connection');
connectDB();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'))

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }))
// Set up session management with a secret key
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

const authRoutes = require("./routes/auth-routes");
const eventRoutes = require("./routes/event-routes");
const complaintRoutes = require("./routes/complaint-routes");


app.get('/api', (req, res) => {
  res.send("hey");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/complaints", complaintRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
