const axios = require("axios");
const { createContestDocument } = require("../appwrite/config");
async function getLatestCodeChefQuestions() {
    try {
        const url =
            "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";
        const response = await axios.get(url);
        const contests = response.data.future_contests;
        const data = contests.map((contest) => {
            return {
                name: contest.contest_name,
                startTime: contest.contest_start_date_iso,
                endTime: contest.contest_end_date_iso,
                duration: contest.contest_duration * 60, // duration in seconds
                link: `https://www.codechef.com/${contest.contest_code}`,
                type: contest.contest_name.includes("Starters")
                    ? "Starters"
                    : "Others",
                contestId: `codechef-${contest.contest_code}`,
                platform: "CodeChef",
            };
        });
        const promise = data.map(createContestDocument);
        await Promise.all(promise);
        console.log("CodeChef questions fetched and stored successfully.");
    } catch (error) {
        console.error("Error fetching CodeChef questions:", error.message);
    }
}

module.exports = {
    getLatestCodeChefQuestions,
};
