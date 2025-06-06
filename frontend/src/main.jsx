import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { Discussion } from "./components/Discussion/Discussion.jsx";
import { Home } from "./components/Home/Home.jsx";
import { ChatWrapper } from "./ChatWrapper.jsx";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<App />}>
				<Route index element={<Home />} />
				<Route path="/discussion" element={<Discussion />} />
			</Route>
			<Route path="/discussions/:roomId" element={<ChatWrapper />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
