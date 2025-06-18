const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // already exists in your project

// GET /api/admin/users
router.get("/users", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user); // req.user is set by authMiddleware

		if (!user || !user.isAdmin) {
			return res.status(403).json({ error: "Access denied" });
		}

		const users = await User.find().select("-__v"); // exclude __v field
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
