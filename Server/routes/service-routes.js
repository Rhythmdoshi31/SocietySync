const express = require("express");
const authMiddleware = require("../middlewares/auth");
const serviceModel = require("../models/serviceModel");
const userModel = require("../models/userModel");
const workerModel = require("../models/workerModel");
const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    const { category, detail } = req.body;

    if (!category || !detail) return res.status(400).json({ message: 'Invalid request' });

    try {
        const existing = await serviceModel.findOne({ category, detail });
        if (existing) return res.json({ message: "Service Request already exists"});
        const today = new Date();
        const parts = today.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).split(" ");
        const formattedDate = `${parts[0]}, ${parts.slice(1).join(' ')}`;
        let worker;
        if (category === "Carpentering" || category === "Electrical") worker = await workerModel.findOne({name: "Sakharam"});
        else worker = await workerModel.findOne({name: "ManiRam Sharma"});

        const service = new serviceModel({
            residentId: req.user._id,
            houseNo: req.user.houseNo,
            category,
            detail,
            status: "open",
            request: formattedDate,
            workerId: worker._id,
        });
        await service.save();
    
        res.json(service);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Oops! Something broke. We're working on it."});
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        // Get page and limit from query parameters, default to page 1 and limit 10
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        let service;
        const admin = await userModel.findById(req.user._id );
        if (admin && admin.role !== "admin") {
            service = await serviceModel.find({ residentId: req.user._id})
                .sort({ date: 1 })  // Optional: Sort service by date (ascending)
                .skip((pageNumber - 1) * limitNumber)  // Skip service based on current page
                .limit(limitNumber);  // Limit the number of service returned
        }
        else if (admin && admin.role === "user"){
            service = await serviceModel.find()
                .sort({ date: 1 })  // Optional: Sort service by date (ascending)
                .skip((pageNumber - 1) * limitNumber)  // Skip service based on current page
                .limit(limitNumber);  // Limit the number of service returned
        } else {
            let worker = await workerModel.findOne(req.user._id);
            service = await serviceModel.find({workerId: worker._id})
                .sort({ date: 1 })  // Optional: Sort service by date (ascending)
                .skip((pageNumber - 1) * limitNumber)  // Skip service based on current page
                .limit(limitNumber);  // Limit the number of service returned
        }
        res.json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch services" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { category, detail } = req.body;

    try {
        const updatedRequest = await serviceModel.findByIdAndUpdate(
            id,
            { category, detail },
            { new: true, runValidators: true }  // `new: true` ensures the returned event is the updated one
        );

        if (!updatedRequest) return res.status(404).json({ message: "Request not found" });

        res.json(updatedRequest);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update request" });
    }
});

router.patch("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const updatedRequest = await serviceModel.findByIdAndUpdate(
        id,
        { status: "closed" },
        { new: true }
      );
  
      if (!updatedRequest) return res.status(404).json({ message: "Request not found" });
  
      res.json(updatedRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update status" });
    }
  });
  

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const serviceId = req.params.id;
        
        const request = await serviceModel.findByIdAndDelete(serviceId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.json({ message: "Request deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete request" });
    }
});

module.exports = router;