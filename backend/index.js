// backend/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
	res.json({ message: "Hello from backend!" });
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
