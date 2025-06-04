import React from "react";
import { Hero } from "./Hero";
import { UpcomingContest } from "../Contest/UpcomingContest";
import { PastContest } from "../Contest/PastContest";
import { Footer } from "../Footer/Footer";
export const Home = () => {
	return (
		<div>
			<Hero />
			<UpcomingContest />
			<PastContest />
			<Footer />
		</div>
	);
};
