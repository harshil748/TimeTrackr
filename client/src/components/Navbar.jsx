import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedMode = localStorage.getItem("darkMode") === "true";
		setDarkMode(savedMode);
		document.documentElement.classList.add("dark"); // Enforce dark mode globally
	}, []);

	const toggleDarkMode = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		localStorage.setItem("darkMode", newMode);
		document.documentElement.classList.toggle("dark", newMode);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	};

	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
			<div className="text-xl font-bold text-blue-600 dark:text-blue-300">
				TimeTrackr
			</div>
			<div className="flex items-center space-x-6">
				<Link
					className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
					to="/dashboard"
				>
					Dashboard
				</Link>
				<Link
					className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
					to="/reports"
				>
					Reports
				</Link>
				<span className="text-gray-500 dark:text-gray-400 text-sm">
					{user?.name}
				</span>
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
				>
					Logout
				</button>
				<button
					onClick={toggleDarkMode}
					className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
				>
					{darkMode ? "Light Mode" : "Dark Mode"}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
