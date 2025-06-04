import { Home } from "./components/Home/Home";
import { NavbarDemo } from "./components/NavBar/NavBar";

export const App = () => {
	return (
		<div className="min-h-screen bg-gray-950 lg:px-12 px-5 text-gray-200">
			<NavbarDemo />
			<Home />
		</div>
	);
};
