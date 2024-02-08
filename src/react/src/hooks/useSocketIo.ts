import { useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";

export const useSocketIo = (room: string) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	useEffect(() => {
		setSocket(
			io(`localhost:9092/?room=${room}`, {
				reconnectionDelay: 500,
				reconnectionAttempts: 3,
				autoConnect: false,
				secure: true,
				transportOptions: ["pooling", "websocket"],
				auth: {
					token: "abc123",
				},
			}),
		);

		return () => {
			if (socket) {
				socket.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (!socket) {
			return;
		}
		socket.on("connect", function () {
			console.log(`Connected with ID: ${socket.id}`);
		});
		socket.on("disconnect", function () {
			console.log("The client has disconnected!");
		});
		socket.on("reconnect_attempt", (attempts) => {
			console.log(`Try to reconnect at ${attempts} attempt(s).`);
		});
	}, [socket]);

	return socket;
};
