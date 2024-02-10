import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type MessageResponse } from "~/grpc/chat";
import { ChatMessage } from "./ChatMessage";

export const ChatBox = (grpcResponse: MessageResponse | undefined) => {
	return (
		<ScrollArea className="max-h-72 w-1/3 overflow-hidden rounded-md border p-2">
			<div className="p-4">
				{!!grpcResponse &&
					grpcResponse.messages.map((msg) => (
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
			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};
