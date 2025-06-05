import React, { useState } from "react";
import TaskList from "../components/TaskList";
import Timer from "../components/Timer";

const Dashboard = () => {
	const userId = "PUT_YOUR_USER_ID_HERE"; // Replace with actual user ID
	const [selectedTask, setSelectedTask] = useState(null);

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">🧠 TimeTrackr Dashboard</h1>

			<TaskList userId={userId} onSelectTask={setSelectedTask} />

			{selectedTask && (
				<div className="mt-4">
					<h3 className="text-xl font-semibold mb-2">
						Tracking: {selectedTask.title}
					</h3>
					<Timer userId={userId} taskId={selectedTask._id} />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
