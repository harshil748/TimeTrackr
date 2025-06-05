import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({ userId, onSelectTask }) => {
	const [tasks, setTasks] = useState([]);
	const [form, setForm] = useState({ title: "", description: "" });

	const fetchTasks = async () => {
		const res = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
		setTasks(res.data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:5000/api/tasks", {
			...form,
			user: userId,
		});
		setForm({ title: "", description: "" });
		fetchTasks();
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="p-4 bg-white rounded shadow mb-6">
			<h2 className="text-lg font-semibold mb-2">Your Tasks</h2>
			<form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
				<input
					type="text"
					placeholder="Task title"
					className="p-2 border rounded"
					value={form.title}
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					required
				/>
				<input
					type="text"
					placeholder="Description"
					className="p-2 border rounded"
					value={form.description}
					onChange={(e) => setForm({ ...form, description: e.target.value })}
				/>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded"
					type="submit"
				>
					Add Task
				</button>
			</form>
			<ul className="space-y-2">
				{tasks.map((task) => (
					<li
						key={task._id}
						className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
						onClick={() => onSelectTask(task)}
					>
						<strong>{task.title}</strong>
						<p className="text-sm text-gray-600">{task.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
