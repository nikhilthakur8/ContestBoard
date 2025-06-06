import { ref, serverTimestamp, set } from "firebase/database";
import { db } from "./config.js";

function setUserData(userId, name) {
	const userRef = ref(db, "users/" + userId);
	set(userRef, {
		name,
		createdAt: serverTimestamp(),
	});
}

export { setUserData };
