const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		title: { type: String, required: true },
		description: String,
		completed: { type: Boolean, default: false },
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
