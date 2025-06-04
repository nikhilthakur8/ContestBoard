import React, { useEffect } from "react";
import { Question } from "../Questions/QuestionTable";
import { getLastUpdatedDate, getLatestContest } from "../../appwrite/config";

export const UpcomingContest = () => {
	const [latestContest, setLatestContest] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(0);
	const [lastUpdated, setLastUpdated] = React.useState(new Date());
	const [selected, setSelected] = React.useState([0]);

	useEffect(() => {
		getLastUpdatedDate().then((date) => {
			if (date) {
				setLastUpdated(date);
			}
		});
	}, []);

	useEffect(() => {
		getLatestContest((currentPage - 1) * 10, 10, selected).then(
			({ documents, total }) => {
				if (documents) {
					setLatestContest(documents);
					setTotalPages(Math.ceil(total / 10));
				}
			}
		);
	}, [currentPage, selected]);

	return (
		<div id="latest-contest">
			<Question
				questions={latestContest}
				title={"UPCOMING CONTESTS"}
				footer={
					"Last Updated On : " +
					new Date(lastUpdated).toLocaleString()
				}
				platformsSelected={{ selected, setSelected }}
				paginationData={{
					currentPage,
					setCurrentPage,
					totalPages,
				}}
			/>
		</div>
	);
};
