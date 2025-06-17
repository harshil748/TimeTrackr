import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("harshil@example.com");
	const [password, setPassword] = useState("mypassword");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
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
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold mb-6">Login</h1>
			<form
				onSubmit={handleLogin}
				className="bg-white p-6 rounded shadow-md w-80"
			>
				<input
					className="w-full mb-4 p-2 border rounded"
					type="email"
					value={email}
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="w-full mb-4 p-2 border rounded"
					type="password"
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
					type="submit"
				>
					Login
				</button>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default Login;
