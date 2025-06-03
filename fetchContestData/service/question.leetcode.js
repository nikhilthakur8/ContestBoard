const { default: axios } = require("axios");
const { createContestDocument } = require("../appwrite/config");

async function getLatestLeetCodeQuestions() {
    try {
        const url = "https://leetcode.com/graphql";
        const response = await axios.post(url, {
            query: `
				query upcomingContests {
					upcomingContests {
						title
						titleSlug
						startTime
						duration
						__typename
					}
				}
			`,
        });
        const upcomingContests = response.data.data.upcomingContests;
        const data = upcomingContests.map((contest) => {
            const startTime = new Date(contest.startTime * 1000);
            const endTime = new Date(
                contest.startTime * 1000 + contest.duration * 1000
            );
            const type = contest.title.includes("Weekly")
                ? "Weekly"
                : "Biweekly";
            return {
                name: contest.title,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                duration: contest.duration, // duration in seconds
                link: `https://leetcode.com/contest/${contest.titleSlug}`,
                type: type,
                contestId: `leetcode_${contest.titleSlug}`,
                platform: "LeetCode",
            };
        });
        const promises = data.map(createContestDocument);
        await Promise.all(promises);
        console.log("LeetCode questions fetched and saved successfully.");
    } catch (error) {
        console.error("Error fetching LeetCode questions:", error.message);
    }
}

module.exports = {
    getLatestLeetCodeQuestions,
};
