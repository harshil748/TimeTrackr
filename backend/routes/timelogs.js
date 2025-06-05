const express = require("express");
const router = express.Router();
const TimeLog = require("../models/TimeLog");

// Create a new time log
router.post("/", async (req, res) => {
	try {
		const { user, task, startTime, endTime } = req.body;

		// Calculate duration in seconds
		const duration = Math.floor(
			(new Date(endTime) - new Date(startTime)) / 1000
		);

		const newLog = new TimeLog({
			user,
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

// Optional: Get all logs for a user
router.get("/:userId", async (req, res) => {
	try {
		const logs = await TimeLog.find({ user: req.params.userId }).populate(
			"task"
		);
		res.json(logs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
