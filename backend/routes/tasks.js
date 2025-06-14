const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

// Create a new task
router.post("/", async (req, res) => {
	console.log("POST /api/tasks body:", req.body);
	try {
		const { user, title, description } = req.body;
		const newTask = new Task({ user, title, description });
		const savedTask = await newTask.save();
		res.status(201).json(savedTask);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Get all tasks for a specific user
router.get("/:userId", authMiddleware, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.params.userId }).sort({
			createdAt: -1,
		});
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

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

module.exports = router;
