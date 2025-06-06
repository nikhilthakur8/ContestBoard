import React, { useEffect, useState } from "react";
import { images } from "../../service/platformImg";
import { getAllDiscussions } from "../../appwrite/discussion";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Discussion = () => {
	const navigate = useNavigate();
	const [discussionsData, setDiscussionsData] = useState({
		total: 0,
		documents: [],
	});

	useEffect(() => {
		getAllDiscussions().then(setDiscussionsData).catch(console.error);
	}, []);

	return (
		<div className="py-20 md:py-28  min-h-screen text-gray-300 rounded-md">
			<h2 className="mb-6 text-3xl font-bold tracking-wider text-gray-400">
				All Discussions ({discussionsData.total})
			</h2>
			<div className="flex flex-col gap-4 w-full">
				{discussionsData.documents.map((d) => (
					<div
						key={d.platform}
						className="p-3 md:p-4 rounded-md border border-neutral-800/90 hover:scale-105 transform duration-300 cursor-pointer bg-gray-900 flex gap-3 md:gap-5 items-center"
						onClick={() => navigate(`/discussion/${d.$id}`)}
					>
						<ContestStatus
							startTime={d.startTime}
							endTime={d.endTime}
						/>
						<div className="w-10 shrink-0 h-10 bg-neutral-500/80 flex items-center justify-center rounded-full">
							<img
								src={images[d.platform]}
								alt={d.platform}
								className="object-contain w-7 h-7"
								title={d.platform}
							/>
						</div>
						<div className="flex flex-col sm:flex-row w-full gap-2 justify-between ">
							<div className="flex flex-col justify-center">
								<p className="text-xs text-gray-300">
									{d.type}
								</p>
								<h3
									className="text-base md:text-xl"
									title="platform"
								>
									{d.name}
								</h3>
								<div className="text-gray-500 text-base break-all">
									{d.platform} - {d.contestId}
								</div>
							</div>
							<div className="flex gap-4 justify-between items-center text-xs md:text-sm">
								<div className="flex flex-row items-center gap-4">
									<div className="flex flex-col gap-1">
										<DateTimeBlock
											label="Start"
											date={d.startTime}
										/>
										<TimeBlock
											label="Duration"
											value={`${d.duration / 3600} hours`}
										/>
										<DateTimeBlock
											label="End"
											date={d.endTime}
										/>
									</div>
								</div>
								<a
									href={d.link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:underline hidden sm:block"
									title={d.link}
								>
									<ExternalLink className="hover:text-green-500" />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const DateTimeBlock = ({ label, date }) => {
	const dt = new Date(date);
	return (
		<div className="inline-flex gap-1 bg-gray-800 py-0.5 px-2 rounded-md w-fit">
			<span>{dt.toLocaleDateString("en-IN")}</span>
			<span className="uppercase">
				{dt.toLocaleTimeString("en-IN", {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</span>
		</div>
	);
};

const TimeBlock = ({ label, value }) => (
	<div className="inline-flex gap-1 bg-gray-800 py-0.5 px-2 rounded-md w-fit">
		<span>{value}</span>
	</div>
);

export const ContestStatus = ({ startTime, endTime, className }) => {
	const now = new Date();
	const start = new Date(startTime);
	const end = new Date(endTime);
	const status =
		now < start ? "bg-gray-400" : now > end ? "bg-red-400" : "bg-green-400";

	return (
		<div
			className={`relative size-3  items-center justify-center rounded-full ${className}`}
		>
			<div
				className={`absolute w-full h-full animate-ping ${status} rounded-full`}
			/>
			<div className={`size-3 relative ${status} rounded-full`} />
		</div>
	);
};
