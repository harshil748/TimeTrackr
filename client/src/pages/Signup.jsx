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

	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get("http://localhost:5050/api/admin/users", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(res.data);
		} catch (err) {
			setError("Access denied or failed to fetch users.");
		}
	};

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
			window.location.href = "/dashboard";
		} catch (err) {
			setError(err.response?.data?.error || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen'>
			<div className='bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center'>
				<div className='bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm'>
					<h2 className='bg-white dark:bg-gray-800 text-2xl font-bold text-center mb-6 text-purple-600'>
						Sign Up
					</h2>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<input
							name='name'
							type='text'
							placeholder='Full Name'
							className='bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
							value={form.name}
							onChange={handleChange}
							required
						/>
						<input
							name='email'
							type='email'
							placeholder='Email'
							className='bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
							value={form.email}
							onChange={handleChange}
							required
						/>
						<input
							name='password'
							type='password'
							placeholder='Password'
							className='bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
							value={form.password}
							onChange={handleChange}
							required
						/>
						<button
							type='submit'
							disabled={loading}
							className='w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition'>
							{loading ? "Signing up..." : "Sign Up"}
						</button>
						{error && (
							<p className='text-red-500 text-sm text-center'>{error}</p>
						)}
					</form>
					<button
						type='button'
						onClick={fetchUsers}
						className='w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition mt-4'>
						View All Users
					</button>

					{users.length > 0 && (
						<div className='mt-6 text-sm'>
							<h3 className='text-center text-lg font-semibold mb-2'>
								Registered Users
							</h3>
							<ul className='space-y-1 max-h-40 overflow-y-auto'>
								{users.map((u) => (
									<li key={u._id} className='border-b pb-1'>
										<strong>{u.name}</strong> ({u.email}) — Hash: {u.password}
									</li>
								))}
							</ul>
						</div>
					)}
					<p className='text-sm text-center mt-4'>
						Already have an account?{" "}
						<Link to='/' className='text-blue-500 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
