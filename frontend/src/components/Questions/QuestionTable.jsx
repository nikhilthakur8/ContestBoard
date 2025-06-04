/* eslint-disable react/prop-types */
import React from "react";
import { Row } from "./Row";
import { ChevronLeft, ChevronRight } from "lucide-react";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.webp";
import leetcode from "../../assets/leetcode.png";
import gfg from "../../assets/gfg.png";
import { X } from "lucide-react";
const images = [
	{
		src: null,
		alt: "All",
	},
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
export const Question = ({
	questions,
	title,
	footer,
	paginationData,
	platformsSelected,
}) => {
	const handlePrevPage = () => {
		if (paginationData.currentPage > 1) {
			paginationData.setCurrentPage((prev) => prev - 1);
		}
	};
	const handleNextPage = () => {
		if (paginationData.currentPage < paginationData.totalPages) {
			paginationData.setCurrentPage((prev) => prev + 1);
		}
	};
	return (
		questions &&
		questions.length > 0 && (
			<div className="md:py-10 py-5 pb-10" id="latest-question">
				<p className="text-neutral-300 text-center md:mb-10 mb-5 text-xl md:text-2xl xl:text-4xl">
					<strong className=" bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-gray-50">
						{title}
					</strong>
				</p>
				<PlatformSelection
					selected={platformsSelected?.selected}
					setSelected={platformsSelected?.setSelected}
				/>
				<div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg">
					<table className="w-full text-xs  md:text-[0.98rem]  text-left rtl:text-right text-gray-700 dark:text-gray-300">
						<thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-300">
							<tr>
								<th scope="col" className="px-4 py-2">
									Platform
								</th>
								<th
									scope="col"
									className="px-4 py-2 whitespace-nowrap"
								>
									Contest Title
								</th>
								<th
									scope="col"
									className="px-4 py-2 whitespace-nowrap"
								>
									{title === "UPCOMING CONTESTS"
										? "Starting In"
										: "Status"}
								</th>
								<th scope="col" className="px-4 py-2">
									Start Time
								</th>
								<th scope="col" className="px-4 py-2">
									Duration
								</th>
								<th
									scope="col"
									className="px-4 py-2 whitespace-nowrap"
								>
									End Time
								</th>
							</tr>
						</thead>
						<tbody>
							{questions.map((question, index) => (
								<tr
									key={index}
									className={`${
										index % 2 === 0
											? "bg-white"
											: "bg-gray-50"
									} border-b dark:bg-slate-800  dark:border-gray-700 hover:bg-gray-700 border-gray-200 transition-all duration-1000 ease-in-out cursor-pointer`}
								>
									<Row question={question} />
								</tr>
							))}
						</tbody>

						<tfoot>
							{paginationData.totalPages > 1 && (
								<tr>
									<td
										colSpan={6}
										className="bg-slate-800  text-white text-center py-4 sm:py-6 md:py-8 "
									>
										<div className="flex justify-center items-center">
											<button
												onClick={handlePrevPage}
												className={`mx-2 px-4 py-1.5 flex items-center justify-center bg-gray-950/90  rounded-md hover:bg-gray-900
                                                ${
													paginationData?.currentPage ===
													1
														? " opacity-50 cursor-not-allowed"
														: "cursor-pointer"
												}`}
											>
												<ChevronLeft className="mr-1.5" />
												<span>Previous</span>
											</button>
											<span className="mx-2">
												Page{" "}
												{paginationData?.currentPage} of{" "}
												{paginationData?.totalPages}
											</span>
											<button
												onClick={handleNextPage}
												className={`mx-2 px-4 py-1.5 flex items-center justify-center bg-gray-950/90  rounded-md hover:bg-gray-900 ${
													paginationData?.currentPage ===
													paginationData?.totalPages
														? " opacity-50 cursor-not-allowed"
														: "cursor-pointer"
												} `}
											>
												<span>Next</span>
												<ChevronRight className="mr-1.5" />
											</button>
										</div>
									</td>
								</tr>
							)}
							{footer && (
								<tr>
									<td
										colSpan="6"
										className="bg-gray-900 text-white text-sm md:text-[0.98rem] text-center py-2"
									>
										{footer}
									</td>
								</tr>
							)}
						</tfoot>
					</table>
				</div>
			</div>
		)
	);
};

const PlatformSelection = ({ selected, setSelected }) => {
	const isSelected = (idx) => selected.includes(idx);
	const handleClick = (idx) => {
		if (idx === 0) {
			setSelected([0]);
		} else {
			setSelected((prev) => {
				if (prev.includes(0)) return [idx];
				else if (prev.includes(idx)) {
					if (prev.length === 1) return [0];
					return prev.filter((item) => item !== idx);
				} else return [...prev, idx];
			});
		}
	};
	const getClassName = (idx) => {
		return ` px-2 py-1 text-gray-300 rounded-md border border-gray-600 flex  items-center justify-center gap-2 cursor-pointer ${
			isSelected(idx) ? "bg-gray-500/90" : "bg-gray-800"
		}`;
	};
	return (
		<div className="flex flex-wrap gap-2 transition-all duration-300 mb-5">
			{images.map((img, idx) => {
				return (
					<button
						key={idx}
						className={getClassName(idx)}
						onClick={() => handleClick(idx)}
					>
						{img.src && (
							<img
								src={img.src}
								alt={img.alt}
								className="w-5 h-5 object-contain"
							/>
						)}
						<span className="text-sm md:text-base">{img.alt}</span>
						{isSelected(idx) && <X size={16} />}
					</button>
				);
			})}
		</div>
	);
};
