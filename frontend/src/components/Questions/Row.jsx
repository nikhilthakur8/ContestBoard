/* eslint-disable react/prop-types */
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Donut, Dot, ExternalLink } from "lucide-react";

import codeforces from "../../assets/codeforces.webp";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import gfg from "../../assets/gfg.png";
const image = {
	codeforces: {
		src: codeforces,
		alt: "Codeforces",
	},
	leetcode: {
		src: leetcode,
		alt: "Leetcode",
	},
	codechef: {
		src: codechef,
		alt: "Codechef",
	},
	geeksforgeeks: {
		src: gfg,
		alt: "GeeksforGeeks",
	},
};
function startingIn(startDate, endDate) {
	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);
	if (now >= start && now <= end)
		return (
			<span className="text-green-400 flex items-center gap-3">
				<span className="relative flex size-3 rounded-full">
					<span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-green-400 opacity-75"></span>
					<span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
				</span>
				<span>Ongoing</span>
			</span>
		);
	if (now > end)
		return (
			<span className="text-red-400">
				<span>Ended</span>
			</span>
		);
	const diff = start - now;
	const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
	const hours = Math.abs(
		Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	);
	const minutes = Math.abs(
		Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	);
	return `${days ? days + "d " : ""}${hours ? hours + "h " : ""}${
		minutes ? minutes + "m" : ""
	}`;
}
export const Row = ({ question }) => {
	return (
		<>
			<td>
				<div className="px-4 py-2 flex items-center gap-2 ">
					<span className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700 border border-gray-600">
						{image[question.platform.toLowerCase()]?.src && (
							<img
								src={image[question.platform.toLowerCase()].src}
								alt={image[question.platform.toLowerCase()].alt}
								title={
									image[question.platform.toLowerCase()].alt
								}
								className="object-contain w-5 h-5"
							/>
						)}
					</span>
					<p>{question.type}</p>
				</div>
			</td>
			<td className="w-full font-medium whitespace-nowrap text-left text-blue-400 hover:text-blue-500 hover:underline">
				<a href={question.link} rel="noreferrer" target="_blank">
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="cursor-pointer w-full px-4 py-3 text-left flex flex-row items-center space-x-2">
									<span>{question.name}</span>
									<ExternalLink className="size-5"/>
								</div>
							</TooltipTrigger>

							<TooltipContent
								side="top"
								align="center"
								className="bg-emerald-800 border-none text-sm text-gray-300"
							>
								Visit Now
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</a>
			</td>
			<td className="px-4 py-3 whitespace-nowrap">
				{startingIn(question?.startTime, question?.endTime)}
			</td>
			<td className="px-4 py-3 whitespace-nowrap">
				{new Date(question.startTime).toLocaleString()}
			</td>
			<td className="px-4 py-3 whitespace-nowrap">
				<span className="bg-gray-700 border text-sm border-gray-600 rounded-md px-0.5 py-0.5 flex items-center justify-center">
					{question.duration / 3600}{" "}
					{question.duration === 1 ? "hour" : "hours"}
				</span>
			</td>
			<td className="px-4 py-3 whitespace-nowrap">
				{new Date(question.endTime).toLocaleString()}
			</td>
		</>
	);
};
