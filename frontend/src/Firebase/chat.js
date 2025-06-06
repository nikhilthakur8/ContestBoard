import { ref, push, onChildAdded, get, off } from "firebase/database";
import { db } from "./config.js";

function sendMessage(roomId, newMessage) {
	const messageRef = ref(db, `messages/${roomId}`);
	push(messageRef, newMessage);
}
function getAllMessages(roomId, callBack) {
	const messageRef = ref(db, `messages/${roomId}`);
	get(messageRef).then((snapshot) => {
		if (snapshot.exists()) {
			const messages = [];
			snapshot.forEach((childSnapshot) => {
				const data = childSnapshot.val();
				data.id = childSnapshot.key; // Add the message ID
				messages.push(data);
			});
			callBack(messages);
		}
	});
}

function readRecentMessage(roomId, callBack) {
	const messageRef = ref(db, `messages/${roomId}`);
	const childAddedCallback = (snapshot) => {
		const data = snapshot.val();
		data.id = snapshot.key;
		callBack(data);
	};
	onChildAdded(messageRef, childAddedCallback);
	return () => {
		off(messageRef, "child_added", childAddedCallback);
	};
}

export { sendMessage, readRecentMessage, getAllMessages };
