import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import Navbar from "../components/Navbar";

const COLORS = [
	"#6366f1",
	"#ec4899",
	"#facc15",
	"#22c55e",
	"#0ea5e9",
	"#8b5cf6",
];

const Reports = () => {
	const [data, setData] = useState([]);
	const [logs, setLogs] = useState([]);
	const [weekly, setWeekly] = useState([]);
	const token = localStorage.getItem("token");

	const fetchLogs = async () => {
		try {
			const res = await axios.get("http://localhost:5050/api/timelogs", {
				headers: { Authorization: `Bearer ${token}` },
			});

			const totals = {};
			res.data.forEach((log) => {
				const taskName = log.task?.title || "Unknown Task";
				totals[taskName] = (totals[taskName] || 0) + log.duration;
			});

			const chartData = Object.entries(totals).map(([task, duration], i) => ({
				task,
				hours: Math.round((duration / 3600) * 100) / 100,
				color: COLORS[i % COLORS.length],
			}));

			setData(chartData);
			setLogs(res.data);
			setWeekly(getWeeklyData(res.data));
		} catch (err) {
			console.error("Failed to load logs:", err);
		}
	};
    const getWeeklyData = (logs) => {
			const dayMap = {};

			logs.forEach((log) => {
				const date = new Date(log.startTime).toLocaleDateString();
				dayMap[date] = (dayMap[date] || 0) + log.duration;
			});

			return Object.entries(dayMap).map(([date, duration]) => ({
				date,
				hours: Math.round((duration / 3600) * 100) / 100,
			}));
		};
	useEffect(() => {
		fetchLogs();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="p-6 max-w-6xl mx-auto space-y-8">
				<h1 className="text-2xl font-bold">Time Reports</h1>

				{/* Bar Chart */}
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-semibold mb-2">Time Spent per Task</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="task" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="hours" fill="#6366f1" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Pie Chart */}
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-semibold mb-2">
						Proportional Time Distribution
					</h2>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={data}
								dataKey="hours"
								nameKey="task"
								cx="50%"
								cy="50%"
								outerRadius={100}
								label
							>
								{data.map((entry, index) => (
									<Cell key={entry.task} fill={entry.color} />
								))}
							</Pie>
							<Legend />
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>

				{/* Weekly Bar Chart */}
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-semibold mb-2">Weekly Time Tracker</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={weekly}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="hours" fill="#f59e0b" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Logs History */}
				<div className="bg-white p-4 rounded shadow overflow-x-auto">
					<h2 className="text-lg font-semibold mb-4">Log History</h2>

					<div className="flex justify-end mb-4">
						<CSVLink
							data={logs.map((log) => ({
								Task: log.task?.title || "Untitled",
								"Start Time": new Date(log.startTime).toLocaleString(),
								"End Time": new Date(log.endTime).toLocaleString(),
								Duration: `${(log.duration / 60).toFixed(1)} min`,
							}))}
							filename="timelogs.csv"
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
						>
							Export as CSV
						</CSVLink>
                    </div>
                    
					{logs.length === 0 ? (
						<p className="text-gray-500">No logs found.</p>
					) : (
						<table className="min-w-full text-sm">
							<thead>
								<tr className="bg-gray-100 text-left">
									<th className="p-2">Task</th>
									<th className="p-2">Start</th>
									<th className="p-2">End</th>
									<th className="p-2">Duration</th>
								</tr>
							</thead>
							<tbody>
								{logs.map((log) => (
									<tr key={log._id} className="border-b hover:bg-gray-50">
										<td className="p-2">{log.task?.title || "Untitled"}</td>
										<td className="p-2">
											{new Date(log.startTime).toLocaleString()}
										</td>
										<td className="p-2">
											{new Date(log.endTime).toLocaleString()}
										</td>
										<td className="p-2">
											{(log.duration / 60).toFixed(1)} min
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
};

export default Reports;
