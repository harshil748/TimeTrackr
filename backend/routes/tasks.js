const User = require("../models/User");
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");
// Update a task
router.put("/:id", async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete a task
router.delete("/:id", async (req, res) => {
	try {
		await Task.findByIdAndDelete(req.params.id);
		res.json({ message: "Task deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET tasks of any user (admin only)
router.get("/user/:userId", authMiddleware, async (req, res) => {
	try {
		const admin = await User.findById(req.user);
		if (!admin || !admin.isAdmin) {
			return res.status(403).json({ error: "Access denied" });
		}

		const tasks = await Task.find({ user: req.params.userId }).sort({
			createdAt: -1,
		});
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// POST new task
router.post("/", authMiddleware, async (req, res) => {
	try {
		const { title, description } = req.body;
		const newTask = new Task({
			user: req.user,
			title,
			description,
			completed: false, // Explicitly set completed to false
		});
		const savedTask = await newTask.save();
		console.log("Task created:", savedTask); // Debug log
		res.status(201).json(savedTask);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.put("/:id", authMiddleware, async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		console.log("Task updated:", updatedTask); // Debug log
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
