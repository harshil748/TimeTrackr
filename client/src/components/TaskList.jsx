import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({ userId, onSelectTask, onCompleteTask }) => {
	const [tasks, setTasks] = useState([]);
	const [form, setForm] = useState({ title: "", description: "" });

	const fetchTasks = async () => {
		const res = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
		setTasks(res.data);
	};

	const deleteTask = async (id) => {
		await axios.delete(`http://localhost:5000/api/tasks/${id}`);
		fetchTasks();
	};

	const markComplete = async (id) => {
		await axios.put(`http://localhost:5000/api/tasks/${id}`, {
			completed: true,
		});
		onCompleteTask(id);
		fetchTasks();
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
		<div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
			<h2 className="bg-white dark:bg-gray-800 text-lg font-semibold mb-2">
				Your Tasks
			</h2>
			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-gray-800 mb-4 flex flex-col gap-2"
			>
				<input
					type="text"
					placeholder="Task title"
					className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
					value={form.title}
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					required
				/>
				<textarea
					placeholder="Task Description (optional)"
					className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
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
					<li key={task._id} className="p-2 border rounded">
						<div className="flex justify-between items-center">
							<div
								onClick={() => onSelectTask(task)}
								className="cursor-pointer"
							>
								<strong>{task.title}</strong>
								<p className="bg-white dark:bg-gray-800 text-sm text-gray-600">
									{task.description}
								</p>
								{task.completed && (
									<span className="text-green-600 text-xs font-semibold">
										✓ Completed
									</span>
								)}
							</div>
							<div className="flex gap-2">
								{!task.completed && (
									<button
										onClick={() => markComplete(task._id)}
										className="bg-green-500 text-white px-2 py-1 rounded text-sm"
									>
										Complete
									</button>
								)}
								<button
									onClick={() => deleteTask(task._id)}
									className="bg-red-500 text-white px-2 py-1 rounded text-sm"
								>
									Delete
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
