import { useState } from "react";
import { type Message } from "../../grpc/chat";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
interface ChatBoxProps {
	msgs: Message[] | undefined;
}

export const ChatBox = ({ msgs }: ChatBoxProps) => {
	const [messages, _setMessages] = useState(msgs ? msgs : []);

	return (
		<ScrollArea className="h-72 w-1/3 rounded-md border p-2">
			{messages.map((msg) => (
				<div key={msg.messageId}>
					<>
						<ChatMessage
							messageStyle={"OWNER_MSG"}
							message={msg.content}
							created_at={msg.createdAt}
						></ChatMessage>
					</>
				</div>
			))}
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};
