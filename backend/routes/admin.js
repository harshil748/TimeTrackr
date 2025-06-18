const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Enhanced authMiddleware to check admin privileges
const adminAuthMiddleware = async (req, res, next) => {
	try {
		console.log("Fetching user with ID:", req.user);
		const user = await User.findById(req.user);
		if (!user) {
			console.error("User not found in database");
			return res.status(403).json({ error: "Access denied. Admins only." });
		}
		if (!user.isAdmin) {
			console.error("User is not an admin:", user);
			return res.status(403).json({ error: "Access denied. Admins only." });
		}
		console.log("Admin access granted for user:", user);
		next();
	} catch (err) {
		console.error("Error in adminAuthMiddleware:", err.message);
		res.status(500).json({ error: "Internal server error." });
	}
};

// GET /api/admin/users
router.get("/users", authMiddleware, adminAuthMiddleware, async (req, res) => {
	try {
		const users = await User.find().select("-__v"); // exclude __v field
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete(
	"/user/:id",
	authMiddleware,
	adminAuthMiddleware,
	async (req, res) => {
		try {
			const userToDelete = await User.findById(req.params.id);
			if (!userToDelete) {
				return res.status(404).json({ error: "User not found." });
			}
			await User.findByIdAndDelete(req.params.id);
			res.json({ message: "User deleted successfully." });
		} catch (err) {
			res.status(500).json({ error: "Failed to delete user." });
		}
	}
);

module.exports = router;
