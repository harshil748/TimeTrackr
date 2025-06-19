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
			setError(
				"Access denied or failed to fetch users. Please ensure you are logged in as an admin."
			);
		}
	};

	const fetchTasks = async (userId) => {
		try {
			const res = await axios.get(
				`http://localhost:5050/api/tasks/user/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setTasks(res.data);
			setSelectedUser(userId);
		} catch (err) {
			setTasks([]);
			alert("Failed to fetch tasks for the selected user.");
		}
	};

	const deleteUser = async (userId) => {
		try {
			const confirmDelete = window.confirm(
				"Are you sure you want to delete this user?"
			);
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
		<div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
			<div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">
					Admin Dashboard
				</h1>
				{error && <p className="text-red-500 mb-4 text-center">{error}</p>}
				<div className="grid md:grid-cols-2 gap-8">
					{/* Users List */}
					<div>
						<h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>
						<div className="space-y-4">
							{users.map((u) => (
								<div
									key={u._id}
									className="border border-gray-200 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
								>
									<div className="mb-2">
										<p className="font-bold text-lg">{u.name}</p>
										<p className="text-sm text-gray-600">{u.email}</p>
										<p className="text-xs text-gray-400 break-all">
											Hash: {u.password}
										</p>
									</div>
									<div className="flex gap-3">
										<button
											className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
											onClick={() => fetchTasks(u._id)}
										>
											View Tasks
										</button>
										<button
											className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
											onClick={() => deleteUser(u._id)}
										>
											Delete
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Tasks List */}
					<div>
						<h2 className="text-xl font-semibold mb-4 text-gray-700">
							{selectedUser ? "Tasks for Selected User" : "Select a User"}
						</h2>
						{tasks.length === 0 ? (
							<p className="text-gray-500 text-sm italic">No tasks found.</p>
						) : (
							<div className="space-y-4">
								{tasks.map((t) => (
									<div
										key={t._id}
										className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
									>
										<p className="font-semibold text-gray-800">{t.title}</p>
										<p className="text-sm text-gray-600">{t.description}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
