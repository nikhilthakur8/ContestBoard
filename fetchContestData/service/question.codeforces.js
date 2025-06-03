const { default: axios } = require("axios");
const { createContestDocument } = require("../appwrite/config");
async function getLatestCodeforcesQuestions() {
    const currentDate = Date.now();
    try {
        const url = "https://codeforces.com/api/contest.list";
        const response = await axios.get(url);
        const contests = response.data.result;
        const filteredContests = contests.filter(
            (contest) => contest.startTimeSeconds * 1000 >= currentDate
        );
        const data = filteredContests.map((contest) => {
            return {
                name: contest.name,
                startTime: new Date(
                    contest.startTimeSeconds * 1000
                ).toISOString(),
                endTime: new Date(
                    (contest.startTimeSeconds + contest.durationSeconds) * 1000
                ).toISOString(),
                duration: contest.durationSeconds,
                link: `https://codeforces.com/contests/${contest.id}`,
                type: contest.type,
                contestId: `codeforces_${contest.id}`,
                platform: "Codeforces",
            };
        });
        const promise = data.map(createContestDocument);
        await Promise.all(promise);
        console.log("Codeforces questions fetched and stored successfully");
    } catch (error) {
        console.error("Error fetching Codeforces questions:", error.message);
    }
}

module.exports = {
    getLatestCodeforcesQuestions,
};
