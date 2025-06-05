import React, { useState, useEffect } from "react";
import axios from "axios";

const Timer = ({ userId, taskId }) => {
	const [startTime, setStartTime] = useState(null);
	const [elapsed, setElapsed] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	const formatTime = (sec) => {
		const mins = Math.floor(sec / 60);
		const secs = sec % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const start = () => {
		const now = new Date();
		setStartTime(now);
		const id = setInterval(() => {
			setElapsed((prev) => prev + 1);
		}, 1000);
		setIntervalId(id);
	};

	const pause = () => {
		clearInterval(intervalId);
	};

	const stop = async () => {
		clearInterval(intervalId);
		const endTime = new Date();
		try {
			await axios.post("http://localhost:5000/api/timelogs", {
				user: userId,
				task: taskId,
				startTime,
				endTime,
			});
			alert("Time log saved!");
		} catch (err) {
			alert("Failed to save log.");
		}
		setStartTime(null);
		setElapsed(0);
		setIntervalId(null);
	};

	return (
		<div className="p-4 rounded-lg bg-white shadow text-center">
			<h2 className="text-lg font-semibold mb-2">Task Timer</h2>
			<div className="text-3xl font-mono mb-4">{formatTime(elapsed)}</div>
			<div className="flex justify-center gap-4">
				<button
					onClick={start}
					className="px-4 py-2 bg-green-500 text-white rounded"
				>
					Start
				</button>
				<button
					onClick={pause}
					className="px-4 py-2 bg-yellow-500 text-white rounded"
				>
					Pause
				</button>
				<button
					onClick={stop}
					className="px-4 py-2 bg-red-500 text-white rounded"
				>
					Stop
				</button>
			</div>
		</div>
	);
};

export default Timer;
