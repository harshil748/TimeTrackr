const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function authMiddleware(req, res, next) {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) return res.status(403).json({ error: "No token provided" });

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded.id;
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
}

module.exports = authMiddleware;
