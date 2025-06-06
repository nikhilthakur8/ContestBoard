import { Analytics } from "@vercel/analytics/react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect, useState } from "react";
import { UserContextProvider } from "./context/ContextProvider";
import { ChatPage } from "./components/Chats/ChatPage";
const fpPromise = FingerprintJS.load();

export const ChatWrapper = () => {
	const [fingerprint, setFingerprint] = useState("");
	useEffect(() => {
		const getFingerprint = async () => {
			const fp = await fpPromise;
			const result = await fp.get();
			localStorage.setItem("deviceFingerprint", result.visitorId);
			setFingerprint(result.visitorId);
		};
		if (localStorage.getItem("deviceFingerprint"))
			setFingerprint(localStorage.getItem("deviceFingerprint"));
		else getFingerprint();
	}, []);
	return (
		<UserContextProvider fingerprint={fingerprint}>
			<ChatPage />
			<Analytics />
		</UserContextProvider>
	);
};
