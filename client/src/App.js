import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Signup from "./pages/Signup";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={ <Login /> } />
				<Route path="/signup" element={<Signup />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/reports" element={<Reports />} />
			</Routes>
		</Router>
	);
}

export default App;
