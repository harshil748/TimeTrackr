import React, { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
	const [tasks, setTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [form, setForm] = useState({ title: "", description: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const token = localStorage.getItem("token");

	const fetchTasks = async () => {
		try {
			const res = await axios.get("http://localhost:5050/api/tasks", {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log("Fetched tasks:", res.data); // Debug log
			setTasks(res.data.filter((task) => !task.completed));
			setCompletedTasks(res.data.filter((task) => task.completed));
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

	const markTaskComplete = async (taskId) => {
		try {
			await axios.put(
				`http://localhost:5050/api/tasks/${taskId}`,
				{ completed: true },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const completedTask = tasks.find((task) => task._id === taskId);
			setCompletedTasks([
				...completedTasks,
				{ ...completedTask, updatedAt: new Date() },
			]);
			setTasks(tasks.filter((task) => task._id !== taskId));
		} catch (err) {
			setError("Failed to mark task as completed.");
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen'>
			<Navbar />
			<div className='p-6 max-w-xl mx-auto'>
				<h1 className='text-2xl font-bold mb-4'>Your Tasks</h1>

				<form
					onSubmit={handleCreate}
					className='bg-white p-4 mb-6 rounded shadow'>
					<input
						className='w-full mb-2 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'
						type='text'
						name='title'
						placeholder='Task Title'
						value={form.title}
						onChange={handleChange}
					/>
					<textarea
						className='w-full mb-2 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'
						name='description'
						placeholder='Task Description (optional)'
						value={form.description}
						onChange={handleChange}
					/>
					<button
						className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
						type='submit'
						disabled={loading}>
						{loading ? "Creating..." : "Add Task"}
					</button>
					{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
				</form>

				{tasks.length === 0 ? (
					<p className='text-gray-500'>No tasks yet. Add one!</p>
				) : (
					<ul className='space-y-3'>
						{tasks.map((task) => (
							<li
								key={task._id}
								className='p-4 bg-white shadow rounded border border-gray-200'>
								<h3 className='font-semibold text-lg'>{task.title}</h3>
								<p className='text-sm text-gray-600'>{task.description}</p>
								<p className='text-xs text-gray-400 mt-1'>
									Created at: {new Date(task.createdAt).toLocaleString()}
								</p>
								<Timer taskId={task._id} />
								<div className='mt-2 flex gap-2'>
									<button
										onClick={() => markTaskComplete(task._id)}
										className='px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600'>
										Complete
									</button>
									<button
										onClick={async () => {
											try {
												await axios.delete(
													`http://localhost:5050/api/tasks/${task._id}`,
													{
														headers: { Authorization: `Bearer ${token}` },
													}
												);
												fetchTasks();
											} catch (err) {
												setError("Failed to delete task.");
											}
										}}
										className='px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600'>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				)}

				{completedTasks.length > 0 && (
					<div className='mt-6'>
						<h2 className='text-lg font-semibold mb-2'>Completed Tasks</h2>
						<ul className='space-y-3'>
							{completedTasks.map((task) => (
								<li
									key={task._id}
									className='p-4 bg-gray-100 shadow rounded border border-gray-200'>
									<h3 className='font-semibold text-lg'>{task.title}</h3>
									<p className='text-sm text-gray-600'>{task.description}</p>
									<p className='text-xs text-gray-400 mt-1'>
										Completed at: {new Date(task.updatedAt).toLocaleString()}
									</p>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
