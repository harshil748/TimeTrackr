import React, { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../components/Timer";

const Dashboard = () => {
	const [tasks, setTasks] = useState([]);
	const [form, setForm] = useState({ title: "", description: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const token = localStorage.getItem("token");

	const fetchTasks = async () => {
		try {
			const res = await axios.get("http://localhost:5050/api/tasks", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTasks(res.data);
		} catch (err) {
			setError("Failed to fetch tasks.");
		}
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCreate = async (e) => {
		e.preventDefault();
		if (!form.title) return;
		try {
			setLoading(true);
			await axios.post("http://localhost:5050/api/tasks", form, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setForm({ title: "", description: "" });
			fetchTasks(); // refresh list
		} catch (err) {
			setError("Failed to create task.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="p-6 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

			<form
				onSubmit={handleCreate}
				className="bg-white p-4 mb-6 rounded shadow"
			>
				<input
					className="w-full mb-2 p-2 border rounded"
					type="text"
					name="title"
					placeholder="Task Title"
					value={form.title}
					onChange={handleChange}
				/>
				<textarea
					className="w-full mb-2 p-2 border rounded"
					name="description"
					placeholder="Task Description (optional)"
					value={form.description}
					onChange={handleChange}
				/>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					type="submit"
					disabled={loading}
				>
					{loading ? "Creating..." : "Add Task"}
				</button>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
			</form>

			{tasks.length === 0 ? (
				<p className="text-gray-500">No tasks yet. Add one!</p>
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
							<Timer taskId={task._id} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dashboard;
