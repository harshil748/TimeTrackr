const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register
router.post( "/register", async ( req, res ) => {
    console.log("➡️  POST /register hit");
	try {
		const { name, email, password } = req.body;

		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ error: "Email already registered" });

		const hashed = await bcrypt.hash(password, 10);

		const newUser = new User({ name, email, password: hashed });
		const savedUser = await newUser.save();

		res
			.status(201)
			.json({ message: "Registered successfully", userId: savedUser._id });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Login
router.post( "/login", async ( req, res ) => {
    console.log("➡️  POST /login hit");
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "User not found" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ error: "Invalid password" });

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

		res.json({
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
