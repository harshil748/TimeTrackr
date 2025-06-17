import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");

	const fetchTasks = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get("http://localhost:5050/api/tasks", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTasks(res.data);
		} catch (err) {
			setError("Failed to fetch tasks.");
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
			{error && <p className="text-red-500">{error}</p>}
			{tasks.length === 0 ? (
				<p className="text-gray-500">No tasks found.</p>
			) : (
				<ul className="space-y-3">
					{tasks.map((task) => (
						<li
							key={task._id}
							className="p-4 bg-white shadow rounded border border-gray-200"
						>
							<h3 className="font-semibold text-lg">{task.title}</h3>
							<p className="text-sm text-gray-600">{task.description}</p>
							<p className="text-xs text-gray-400 mt-1">
								Created at: {new Date(task.createdAt).toLocaleString()}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dashboard;
