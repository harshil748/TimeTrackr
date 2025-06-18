const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function authMiddleware(req, res, next) {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		console.error("No token provided in Authorization header");
		return res.status(403).json({ error: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		console.log("Token successfully verified. User ID:", decoded.id);
		req.user = decoded.id;
		next();
	} catch (err) {
		console.error("Token verification failed:", err.message);
		res.status(401).json({ error: "Invalid token" });
	}
}

module.exports = authMiddleware;
