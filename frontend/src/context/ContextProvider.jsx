import { UserContext } from "./userContext";

export const UserContextProvider = ({ children, fingerprint }) => {
	return (
		<UserContext.Provider value={{ fingerprint }}>
			{children}
		</UserContext.Provider>
	);
};
