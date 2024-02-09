import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { type Timestamp } from "~/grpc/google/protobuf/timestamp";

const variantStyles = {
	OWNER_MSG: {
		WRAPPER: "flex flex-col items-end gap-2",
		MSG: "rounded-lg rounded-br-none bg-primary/50 p-2",
	} as const,
	GUEST_MSG: {
		WRAPPER: "flex flex-col items-start gap-2",
		MSG: "rounded-lg rounded-bl-none bg-primary p-2 text-input",
	} as const,
} as const;

type MessageStylesVariant = keyof typeof variantStyles;

type ChatMessageProps = {
	messageStyle: MessageStylesVariant;
	message: string;
	created_at: Timestamp | undefined;
};

export const ChatMessage = ({
	messageStyle,
	message,
	created_at,
}: ChatMessageProps) => {
	const [chatMessage, _scm] = useState(message);
	const [dateTime, _sdt] = useState(
		(created_at && new Date(created_at.nanos)) || new Date(Date.now()),
	);
	const [variant, _sv] = useState(variantStyles[messageStyle]);

	return (
		<div className={variant.WRAPPER}>
			<span className={variant.MSG}>{chatMessage}</span>
			<Badge className="w-fit" variant="outline">
				{`${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`}
			</Badge>
		</div>
	);
};
