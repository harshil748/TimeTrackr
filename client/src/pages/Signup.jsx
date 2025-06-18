import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await axios.post(
				"http://localhost:5050/api/auth/register",
				form
			);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem(
				"user",
				JSON.stringify({ name: form.name, email: form.email })
			);
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
					Sign Up
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						name="name"
						type="text"
						placeholder="Full Name"
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
						value={form.name}
						onChange={handleChange}
						required
					/>
					<input
						name="email"
						type="email"
						placeholder="Email"
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
						value={form.email}
						onChange={handleChange}
						required
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
						value={form.password}
						onChange={handleChange}
						required
					/>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
					>
						{loading ? "Signing up..." : "Sign Up"}
					</button>
					{error && <p className="text-red-500 text-sm text-center">{error}</p>}
				</form>
				<p className="text-sm text-center mt-4">
					Already have an account?{" "}
					<Link to="/" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
