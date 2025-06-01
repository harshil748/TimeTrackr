// backend/routes/tasks.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "Tasks route works!" });
});

module.exports = router;
