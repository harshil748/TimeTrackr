// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/timetrackr")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Basic test route
app.get("/api/hello", (req, res) => {
	res.json({ message: "Hello from backend!" });
});

// Server start
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
