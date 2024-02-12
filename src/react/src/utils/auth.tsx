import { type ReactNode, createContext, useContext, useState } from "react";

export interface AuthContext {
	isAuthenticated: boolean;
	setToken: (token: string) => void;
	setUser: (username: string) => void;
	token: string;
	user: string;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<string>("");
	const [token, setToken] = useState<string>("");
	const isAuthenticated = !!user || !!token;
	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setToken, setUser, token, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
