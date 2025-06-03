const axios = require("axios");
const { createContestDocument } = require("../appwrite/config");

async function getLatestGeeksforGeeksQuestions() {
	try {
		const url =
			"https://practiceapi.geeksforgeeks.org/api/vr/events/?sub_type=all&type=contest";
		const response = await axios.get(url);
		const contests = response.data.results.upcoming;
		const data = contests.map((contest) => {
			const type = contest.name.includes("Hiring") ? "Hiring" : "Weekly";
			return {
				name: contest.name,
				startTime: contest.start_time,
				endTime: contest.end_time,
				duration:
					(new Date(contest.end_time + " +05:30") -
						new Date(contest.start_time + " +05:30")) /
					1000, // duration in seconds
				link: `https://practice.geeksforgeeks.org/contest/${contest.slug}`,
				type: type,
				contestId: `geeksforGeeks_${contest.slug}`,
				platform: "GeeksforGeeks",
			};
		});
		const promise = data.map(createContestDocument);
		await Promise.all(promise);
		console.log("GeeksforGeeks questions fetched and stored successfully.");
	} catch (error) {
		console.log("Error fetching GeeksforGeeks questions:", error.message);
	}
}

module.exports = {
	getLatestGeeksforGeeksQuestions,
};
