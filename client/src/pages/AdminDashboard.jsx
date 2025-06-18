import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const res = await axios.get("http://localhost:5050/api/admin/users", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUsers(res.data);
		} catch (err) {
			setError("Access denied or failed to fetch users. Please ensure you are logged in as an admin.");
		}
	};

	const fetchTasks = async (userId) => {
		try {
			const res = await axios.get(`http://localhost:5050/api/tasks/user/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTasks(res.data);
			setSelectedUser(userId);
		} catch (err) {
			setTasks([]);
			alert("Failed to fetch tasks for the selected user.");
		}
	};

	const deleteUser = async (userId) => {
		try {
			const confirmDelete = window.confirm("Are you sure you want to delete this user?");
			if (!confirmDelete) return;

			await axios.delete(`http://localhost:5050/api/admin/user/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			alert("User deleted successfully.");
			fetchUsers();
			setTasks([]);
			setSelectedUser(null);
		} catch (err) {
			alert("Failed to delete user. Please try again.");
			console.error("Delete failed", err);
		}
	};

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
			{error && <p className="text-red-500">{error}</p>}
			<div className="grid grid-cols-2 gap-8">
				<div>
					<h2 className="text-lg font-semibold mb-2">Users</h2>
					<ul className="space-y-2">
						{users.map((u) => (
							<li
								key={u._id}
								className="border p-2 rounded flex justify-between"
							>
								<div>
									<p>
										<strong>{u.name}</strong> ({u.email})
									</p>
									<p className="text-xs text-gray-500">Hash: {u.password}</p>
								</div>
								<div className="flex gap-2">
									<button
										className="text-blue-500 underline"
										onClick={() => fetchTasks(u._id)}
									>
										View Tasks
									</button>
									<button
										className="text-red-500 underline"
										onClick={() => deleteUser(u._id)}
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">
						{selectedUser ? "Tasks for Selected User" : "Select a User"}
					</h2>
					{tasks.length === 0 ? (
						<p className="text-gray-500">No tasks found.</p>
					) : (
						<ul className="space-y-2">
							{tasks.map((t) => (
								<li key={t._id} className="border p-2 rounded">
									<p>
										<strong>{t.title}</strong>
									</p>
									<p className="text-sm text-gray-600">{t.description}</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
