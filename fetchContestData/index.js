require("dotenv").config();
// convert all es6 to commonjs

const {
    getLatestLeetCodeQuestions,
} = require("./service/question.leetcode.js");
const {
    getLatestCodeChefQuestions,
} = require("./service/question.codechef.js");
const {
    getLatestGeeksforGeeksQuestions,
} = require("./service/question.gfg.js");
const {
    getLatestCodeforcesQuestions,
} = require("./service/question.codeforces.js");
const { updateLastUpdated } = require("./appwrite/config.js");
module.exports = async function ({ req, res, log }) {
    const leetCodePromise = getLatestLeetCodeQuestions();
    const codeChefPromise = getLatestCodeChefQuestions();
    const geeksforGeeksPromise = getLatestGeeksforGeeksQuestions();
    const codeforcesPromise = getLatestCodeforcesQuestions();
    await Promise.all([
        leetCodePromise,
        codeChefPromise,
        geeksforGeeksPromise,
        codeforcesPromise,
    ]);

    await updateLastUpdated();

    log("All questions fetched and stored successfully.");
    return res.json({
        message: "All questions fetched and stored successfully.",
    });
};
