import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import Navbar from "../components/Navbar";

const Reports = () => {
	const [data, setData] = useState([]);
	const token = localStorage.getItem("token");

	const fetchLogs = async () => {
		try {
			const res = await axios.get("http://localhost:5050/api/timelogs", {
				headers: { Authorization: `Bearer ${token}` },
			});

			// Group duration by task
			const totals = {};
			res.data.forEach((log) => {
				const taskName = log.task?.title || "Unknown Task";
				totals[taskName] = (totals[taskName] || 0) + log.duration;
			});

			// Convert to chart-friendly format
			const chartData = Object.entries(totals).map(([task, duration]) => ({
				task,
				hours: Math.round((duration / 3600) * 100) / 100, // in hours
			}));

			setData(chartData);
		} catch (err) {
			console.error("Failed to load logs:", err);
		}
	};

	useEffect(() => {
		fetchLogs();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="p-6 max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-4">Time Spent Per Task</h1>
				{data.length === 0 ? (
					<p className="text-gray-500">No logs available.</p>
				) : (
					<ResponsiveContainer width="100%" height={400}>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="task" />
							<YAxis
								label={{ value: "Hours", angle: -90, position: "insideLeft" }}
							/>
							<Tooltip />
							<Bar dataKey="hours" fill="#4f46e5" />
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
};

export default Reports;
