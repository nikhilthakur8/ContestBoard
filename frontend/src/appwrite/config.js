import { Client, Databases, Query } from "node-appwrite";
const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export const getLatestContest = async (skip = 0, limit = 10, selected = []) => {
	const platforms = ["CodeChef", "Codeforces", "LeetCode", "GeeksforGeeks"];
	const reqPlatform = [];

	// platform selection logic
	if (selected.includes(0)) reqPlatform.push(...platforms);
	else selected.forEach((idx) => reqPlatform.push(platforms[idx - 1]));

	return await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_COLLECTION_ID,
		[
			Query.offset(skip),
			Query.limit(limit),
			Query.greaterThanEqual("endTime", new Date().toISOString()),
			Query.orderAsc("startTime"),
			Query.equal("platform", reqPlatform),
		]
	);
};
export const getPastContest = async (skip = 0, limit = 10, selected = []) => {
	const platforms = ["CodeChef", "Codeforces", "LeetCode", "GeeksforGeeks"];
	const reqPlatform = [];

	// platform selection logic
	if (selected.includes(0)) reqPlatform.push(...platforms);
	else selected.forEach((idx) => reqPlatform.push(platforms[idx - 1]));

	return await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_COLLECTION_ID,
		[
			Query.offset(skip),
			Query.limit(limit),
			Query.lessThan("endTime", new Date().toISOString()),
			Query.orderDesc("endTime"),
			Query.equal("platform", reqPlatform),
		]
	);
};

export const getLastUpdatedDate = async () => {
	const response = await databases.getDocument(
		import.meta.env.VITE_APPWRITE_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_MISCELLANEOUS_COLLECTION_ID,
		import.meta.env.VITE_APPWRITE_MISCELLANEOUS_DOCUMENT_ID,
		[Query.select(["lastUpdated"])]
	);
	return response.lastUpdated;
};
