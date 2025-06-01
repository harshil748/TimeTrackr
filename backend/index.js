// backend/index.js
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
	.connect(process.env.MONGO_URI || "mongodb://localhost:27017/timetrackr", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});

const express = require("express");
const cors = require( "cors" );
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
	res.json({ message: "Hello from backend!" });
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
} );

const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);
