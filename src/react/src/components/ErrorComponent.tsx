type ErrorCompomentProps = {
	error: Error;
};

export const ErrorComponent = ({ error }: ErrorCompomentProps) => {
	return (
		<>
			<span>{error.message}</span>
		</>
	);
};
