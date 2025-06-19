// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

const adminRouter = require("./routes/admin");
app.use("/api/admin", adminRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
console.log("✅ Auth routes loaded");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

const timeLogsRouter = require("./routes/timelogs");
app.use("/api/timelogs", timeLogsRouter);

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/timetrackr")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Basic test route
app.get("/api/hello", (req, res) => {
	res.json({ message: "Hello from backend!" });
});

app.get("/ping", (req, res) => {
	console.log("📡 Ping received");
	res.send("pong");
});

// Server start
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
