import { ExternalLink, Link2 } from "lucide-react";
import { images } from "../../service/platformImg";
import { useNavigate } from "react-router-dom";
export const Hero = () => {
	const navigate = useNavigate();
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

			<p
				className="text-sm md:text-base mt-4 bg-slate-800  flex items-center justify-center gap-3 px-4 py-2 rounded-md cursor-pointer"
				onClick={() => {
					navigate("/discussion", { replace: true });
				}}
			>
				<div className="text-green-400 relative size-3 flex items-center justify-center rounded-full">
					<div className="w-full h-full absolute animate-ping bg-green-400 rounded-full"></div>
					<div className="size-3 relative bg-green-400 rounded-full"></div>
				</div>
				<p>Discussion section is now live!</p>
				<ExternalLink className="text-sky-500 inline m-0 p-0" size={20} />
			</p>
			<div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
				{Object.entries(images).map(([key, image]) => (
					<div
						key={key}
						className="flex items-center gap-2 bg-gray-700 border border-gray-600 px-3 py-1 rounded-lg"
					>
						<img
							src={image}
							alt={key}
							className="h-5 w-5 object-contain"
						/>
						<span className="text-gray-300 text-sm font-semibold">
							{key}
						</span>
					</div>
				))}
			</div>
			{/* <div className="mt-6">
				<Button className={"px-5"}>Go To Discussion Section</Button>
			</div> */}
		</div>
	);
};
