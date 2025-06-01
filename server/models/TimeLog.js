const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
		duration: { type: Number, required: true }, // in seconds
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("TimeLog", timeLogSchema);
