const { Client, Databases, Query, ID } = require("node-appwrite");
const { delay } = require("../utils/delay");
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT);

const databases = new Databases(client);

const createContestDocument = async (data) => {
    await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        ID.unique(),
        data
    );
    await delay(1000);
    return data;
};

const updateLastUpdated = async () => {
    const lastUpdated = new Date().toISOString();
    try {
        await databases.updateDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_MISCELLANEOUS_COLLECTION_ID,
            process.env.APPWRITE_MISCELLANEOUS_DOCUMENT_ID,
            { lastUpdated }
        );
        return lastUpdated;
    } catch (error) {
        console.error("Error updating lastUpdated:", error);
    }
};

module.exports = {
    createContestDocument,
    updateLastUpdated,
};
