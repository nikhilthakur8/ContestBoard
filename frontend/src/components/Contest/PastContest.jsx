import React, { useEffect } from "react";
import { Question } from "../Questions/QuestionTable";
import { getPastContest } from "../../appwrite/config";

export const PastContest = () => {
	const [pastContest, setPastContest] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [selected, setSelected] = React.useState([0]);

	useEffect(() => {
		getPastContest((currentPage - 1) * 10, 10, selected).then(
			({ documents, total }) => {
				if (documents) {
					setPastContest(documents);
					setTotalPages(Math.ceil(total / 10));
				}
			}
		);
	}, [currentPage, selected]);
	return (
		<div>
			<div id="past-contest">
				<Question
					questions={pastContest}
					title={"PAST CONTESTS"}
					paginationData={{
						currentPage,
						setCurrentPage,
						totalPages,
					}}
					platformsSelected={{ selected, setSelected }}
				/>
			</div>
		</div>
	);
};
