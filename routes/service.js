const express = require("express");
const multer = require("multer");
const ServiceRequest = require('../models/serviceModel');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Use memory storage for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Render Service Request Form
router.get("/", authMiddleware, (req, res) => {
    res.render("service-requests");
});

// ✅ Handle Service Request Submission
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { service, description } = req.body;
        const residentId = req.resident.id;

        // Validate category
        const validCategories = ["plumbing", "electrical", "carpentry", "cleaning", "masonry"];
        if (!validCategories.includes(service)) {
            return res.status(400).send("Invalid service category.");
        }

        // Convert Image to Base64 (if uploaded)
        let imageBase64 = req.file ? req.file.buffer.toString("base64") : null;

        // Save to Database
        const newRequest = new ServiceRequest({
            residentId,
            category: service,
            description,
            image: imageBase64, // Store as Base64 string
        });

        await newRequest.save();
        console.log("✅ Service request submitted:", newRequest);

        res.redirect("/service-requests"); // Redirect back to the form
    } catch (error) {
        console.error("❌ Error submitting service request:", error);
        res.status(500).send("Error submitting request");
    }
});

router.get("/my-requests", authMiddleware, async (req, res) => {
    try {
        const residentId = req.resident.id; // ✅ Get ID from JWT Token
        const requests = await ServiceRequest.find({ residentId }).sort({ requestTime: -1 });

        // ✅ Add a new field `statusColor` for EJS
        const updatedRequests = requests.map(req => ({
            ...req.toObject(),
            statusColor: getStatusColor(req.status)
        }));

        res.render("my-requests", { requests: updatedRequests });
    } catch (error) {
        console.error("❌ Error fetching service requests:", error);
        res.status(500).send("Error fetching service requests");
    }
});

// ✅ Function to determine status color
function getStatusColor(status) {
    if (status === "pending") return "bg-yellow-500 text-white";
    if (status === "in-progress") return "bg-blue-500 text-white";
    if (status === "resolved") return "bg-green-500 text-white";
    return "bg-gray-500 text-white";
}


router.get("/service-request", (req, res) => {
    const token = req.cookies.token; // Assuming JWT is stored in cookies
    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY"); // Replace with your JWT secret
        res.render("service-request", { userId: decoded.id }); // ✅ Use `decoded.id`
    } catch (error) {
        res.redirect("/login");
    }
});


module.exports = router;
