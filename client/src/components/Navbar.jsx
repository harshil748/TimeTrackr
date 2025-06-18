import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	};

	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<nav className="bg-white shadow p-4 flex justify-between items-center">
			<div className="text-xl font-bold text-blue-600">TimeTrackr</div>
			<div className="flex items-center space-x-6">
				<Link className="text-gray-700 hover:text-blue-600" to="/dashboard">
					Dashboard
				</Link>
				<Link className="text-gray-700 hover:text-blue-600" to="/reports">
					Reports
				</Link>
				<span className="text-gray-500 text-sm">{user?.name}</span>
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
