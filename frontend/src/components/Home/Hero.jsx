import React from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { ColourfulText } from "../ui/colourful-text";
import { Button } from "../ui/moving-border";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.webp";
import leetcode from "../../assets/leetcode.png";
import gfg from "../../assets/gfg.png";
import { IconNotification, IconNotificationOff } from "@tabler/icons-react";
import { Dot } from "lucide-react";
export const Hero = () => {
	const images = [
		{
			src: codechef,
			alt: "CodeChef",
		},
		{
			src: codeforces,
			alt: "Codeforces",
		},
		{
			src: leetcode,
			alt: "LeetCode",
		},
		{
			src: gfg,
			alt: "GeeksforGeeks",
		},
	];
	return (
		<div className="flex items-center min-h-svh flex-col justify-center text-gray-300 text-center">
			<p className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-b from-gray-200 to-gray-500 bg-clip-text text-transparent py-2">
				All Coding Contests. One Place.
			</p>
			<p className="text-base sm:text-lg md:text-xl mt-4">
				Stay ahead in the world of competitive programming. Track
				contests from Codeforces, LeetCode, AtCoder, and more—without
				missing a beat.
			</p>
			<p className="text-sm md:text-base mt-4 bg-slate-800  flex items-center justify-center gap-4 px-4 py-2 rounded-md">
				<div className="text-yellow-400 relative size-3 flex items-center justify-center rounded-full">
					<div className="w-full h-full absolute animate-ping bg-yellow-400 rounded-full"></div>
					<div className="size-3 relative bg-yellow-400 rounded-full"></div>
				</div>
				<p>
					Launching this week: A discussion section to share hints and
					tips during contests!
				</p>
			</p>
			<div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
				{images.map((image) => (
					<div
						key={image.alt}
						className="flex items-center gap-2 bg-gray-700 border border-gray-600 px-3 py-1 rounded-lg"
					>
						<img
							src={image.src}
							alt={image.alt}
							className="h-5 w-5 object-contain"
						/>
						<span className="text-gray-300 text-sm font-semibold">
							{image.alt}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
