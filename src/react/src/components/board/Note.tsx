import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Cross1Icon, QuoteIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import Markdown from "react-markdown";

interface NoteProps {
	id: string;
	content: string;
}

export const Note = ({ id: _id, content }: NoteProps) => {
	return (
		<Card>
			<CardContent>
				<Markdown>{content}</Markdown>
			</CardContent>
			<CardFooter>
				{/* <Link to="/board/$board/notes/$note"> */}
				<Button variant={"outline"}>
					<QuoteIcon className="mr-2 h-4 w-4"></QuoteIcon> Edit
				</Button>
				{/* </Link> */}
				<Button variant={"outline"}>
					<Cross1Icon className="mr-2 h-4 w-4"></Cross1Icon> Delete
				</Button>
			</CardFooter>
		</Card>
	);
};
