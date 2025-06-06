import { createContext, useContext } from "react";

export const UserContext = createContext({
	fingerprint: null,
});

export const useUserContext = () => useContext(UserContext);
