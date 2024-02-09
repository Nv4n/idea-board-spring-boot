export const auth: Auth = {
	status: "loggedOut",
	username: undefined,
	login: (username: string, password: string) => {
		auth.status = "loggedIn";
		auth.username = username;
	},
	logout: () => {
		auth.status = "loggedOut";
		auth.username = undefined;
	},
};

export type Auth = {
	login: (username: string) => void;
	logout: () => void;
	status: "loggedOut" | "loggedIn";
	username?: string;
};
