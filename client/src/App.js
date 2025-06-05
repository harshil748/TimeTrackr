import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from "./components/Timer";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index"; // Assuming there's an Index component

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
			<Timer userId="PUT_USER_ID_HERE" taskId="PUT_TASK_ID_HERE" />
		</BrowserRouter>
	);
}

export default App;
