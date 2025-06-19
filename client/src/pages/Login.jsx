import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("harshil@example.com");
	const [password, setPassword] = useState("mypassword");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:5050/api/auth/login", {
				email,
				password,
			});
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
					Login
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
					{error && <p className="text-red-500 text-sm text-center">{error}</p>}
				</form>
				<p className="text-sm text-center mt-4">
					Don’t have an account?{" "}
					<Link to="/signup" className="text-blue-500 hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
