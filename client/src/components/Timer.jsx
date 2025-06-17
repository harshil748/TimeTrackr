import React, { useState, useEffect } from "react";
import axios from "axios";

const Timer = ({ taskId }) => {
	const [startTime, setStartTime] = useState(null);
	const [duration, setDuration] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [intervalId, setIntervalId] = useState(null);

	const token = localStorage.getItem("token");

	const handleStart = () => {
		if (isRunning) return;
		const now = new Date();
		setStartTime(now);
		setIsRunning(true);
		const id = setInterval(() => {
			setDuration((prev) => prev + 1);
		}, 1000);
		setIntervalId(id);
	};

	const handleStop = async () => {
		if (!isRunning) return;
		clearInterval(intervalId);
		setIsRunning(false);
		const endTime = new Date();

		try {
			await axios.post(
				"http://localhost:5050/api/timelogs",
				{
					task: taskId,
					startTime,
					endTime,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			alert("Time log saved successfully!");
		} catch (err) {
			alert("Failed to save time log.");
		} finally {
			setDuration(0);
			setStartTime(null);
		}
	};

	return (
		<div className="bg-gray-100 p-3 rounded mt-2">
			<p className="text-sm font-medium">Timer: {duration}s</p>
			<div className="mt-2 flex space-x-2">
				<button
					onClick={handleStart}
					className="bg-green-500 text-white px-3 py-1 rounded"
				>
					Start
				</button>
				<button
					onClick={handleStop}
					className="bg-red-500 text-white px-3 py-1 rounded"
				>
					Stop
				</button>
			</div>
		</div>
	);
};

export default Timer;
