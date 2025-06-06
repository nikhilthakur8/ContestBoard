import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	databaseURL: import.meta.env.VITE_FIREBASE_REALTIME_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
