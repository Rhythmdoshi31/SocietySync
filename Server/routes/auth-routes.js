const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { name, email, password, houseNo } = req.body;
    if (!name || !email || !password || !houseNo) return res.status(400).json({ message: 'Please fill all the credentials' });
    try {
        const existing = await userModel.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already Exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            houseNo,
            password: hashedPassword,
            profilePicture: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token, user: { id: newUser._id, name: newUser.name, houseNo: newUser.houseNo, email: newUser.email, profilePicture: !!newUser.profilePicture?.data, } });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Oops! Something broke. We're working on it."});
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token, user: { id: user._id, name: user.name, houseNo: user.houseNo, email: user.email } });    
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Oops! Something broke. We're working on it."});
    }
});

router.get("/me", authMiddleware, (req, res) => {
    res.json(req.user);
})

router.post("/login/admin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await userModel.findOne({ email });
        if (!admin || admin.role !== "admin") {
            return res.status(400).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                houseNo: admin.houseNo,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Oops! Something went wrong. We're working on it." });
    }
});

  

module.exports = router;