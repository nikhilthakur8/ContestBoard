import { set, ref, serverTimestamp } from "firebase/database";
import { db } from "./config.js";

function setRoomData(roomId, { platform, name, description }) {
	const roomRef = ref(db, "rooms/" + roomId);
	set(roomRef, {
		platform,
		name,
		description,
		createdAt: serverTimestamp(),
	});
}
export { setRoomData };
