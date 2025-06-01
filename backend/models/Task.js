const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: { type: String, required: true },
	description: String,
	createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Task", TaskSchema);
