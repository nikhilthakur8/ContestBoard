import { Client, Databases, Query } from "node-appwrite";
const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export async function getAllDiscussions() {
	const response = await databases.listDocuments(
		import.meta.env.VITE_APPWRITE_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_COLLECTION_ID,
		[
			Query.greaterThanEqual("endTime", new Date().toISOString()),
			Query.orderAsc("startTime"),
			// Query.select(["$id"]),
		]
	);
	return response;
}

export async function getDiscussionById(discussionId) {
	const response = await databases.getDocument(
		import.meta.env.VITE_APPWRITE_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_COLLECTION_ID,
		discussionId
	);
	return response;
}
