const mongoose = require("mongoose");
const TimeLogSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
	startTime: Date,
	endTime: Date,
	duration: Number, // in seconds
});
module.exports = mongoose.model("TimeLog", TimeLogSchema);
