const express = require("express");
const router = express.Router();
const TimeLog = require("../models/TimeLog");
const authMiddleware = require("../middleware/auth");

// Create a new time log
router.post("/", authMiddleware, async (req, res) => {
	try {
		const { task, startTime, endTime } = req.body;

		// Calculate duration in seconds
		const duration = Math.floor(
			(new Date(endTime) - new Date(startTime)) / 1000
		);

		const newLog = new TimeLog({
			user: req.user,
			task,
			startTime,
			endTime,
			duration,
		});

		const saved = await newLog.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Get all logs for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
	try {
		const logs = await TimeLog.find({ user: req.user }).populate("task");
		res.json(logs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
